export const translationsMap = {
  $arrayToObject: {
    $map: {
      input: "$translations",
      as: "translation",
      in: {
        k: "$$translation.key",
        v: "$$translation.value",
      },
    },
  },
};

const handleMatch = (mode, language) => {
  return mode === "soft"
    ? {
        $or: [{ language: language }, { language: { $exists: false } }],
      }
    : { language };
};

const handlePipeline = (pipeline = []) =>
  Array.isArray(pipeline) ? pipeline : [];

const nestedlookup = ({ nested, schema, translationschema, language }) => {
  const generatePipeline = (nestedPath, isArray) => {
    const pipeline = [];

    // If it's an array, add $unwind to ensure proper mapping
    if (isArray) {
      pipeline.push({
        $unwind: {
          path: `$${nestedPath}`,
          preserveNullAndEmptyArrays: true,
        },
      });
    }

    // Efficient $lookup with direct $match filtering by language
    pipeline.push({
      $lookup: {
        from: "translations",
        localField: `${nestedPath}._id`,
        foreignField: "ref",
        as: `${nestedPath}.translationsData`,
        pipeline: [
          { $match: { language } }, // Filter translations by language at the lookup stage
          { $project: { key: 1, value: 1, slug: 1, language: 1 } }, // Include necessary fields only
        ],
      },
    });

    // Transform key-value pairs into an object and merge it with the nested object
    pipeline.push({
      $addFields: {
        [`${nestedPath}`]: {
          $mergeObjects: [
            `$${nestedPath}`,
            {
              $arrayToObject: {
                $map: {
                  input: `$${nestedPath}.translationsData`,
                  as: "translation",
                  in: {
                    k: "$$translation.key",
                    v: "$$translation.value",
                  },
                },
              },
            },
          ],
        },
      },
    });

    // Clean up by removing translationsData
    pipeline.push({
      $project: { [`${nestedPath}.translationsData`]: 0 },
    });

    // If it's an array, group and merge the result into a single object
    if (isArray) {
      pipeline.push(
        {
          $group: {
            _id: "$_id",
            root: { $first: "$$ROOT" },
            [nestedPath]: { $push: `$${nestedPath}` },
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: ["$root", { [nestedPath]: `$${nestedPath}` }],
            },
          },
        }
      );
    }

    return pipeline;
  };

  const nestedPaths = Object.keys(translationschema?.nested || {});
  return nestedPaths.reduce((pipeline, nestedPath) => {
    if (nested && schema?.[nestedPath]) {
      const isArray = Array.isArray(schema[nestedPath]);
      pipeline.push(...generatePipeline(nestedPath, isArray));
    }
    return pipeline;
  }, []);
};

const aggregateWithTranslation = function (pipeline = [], options = {}) {
  const {
    language = "en",
    mode = "strict",
    nested = true,
    disableSorting = false,
  } = options;
  const schema = this?.schema?.obj;
  const translationschema = this?.translationschema;
  const translationPipeline = [
    {
      $lookup: {
        from: "translations",
        localField: "_id",
        foreignField: "ref",
        as: "translations",
        pipeline: [
          { $match: { language } },
          { $project: { key: 1, value: 1, slug: 1, language: 1 } },
        ],
      },
    },
    {
      $addFields: {
        translation: {
          $arrayToObject: {
            $map: {
              input: "$translations",
              as: "translation",
              in: {
                k: "$$translation.key",
                v: "$$translation.value",
              },
            },
          },
        }, // Transform key-value pairs into an object
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [
            "$$ROOT", // Merge existing fields
            "$translation", // Flatten the translation object into the root level
            {
              slug: { $first: "$translations.slug" },
              language: { $first: "$translations.language" },
            }, // Add `slug` and `language`
          ],
        },
      },
    },
    {
      $project: {
        translations: 0,
        translation: 0, // Remove intermediate fields
      },
    },
    ...nestedlookup({ nested, schema, translationschema, language }),
  ];

  const sort = disableSorting
    ? []
    : [
        {
          $sort: { _id: 1 },
        },
      ];
  const finalPipeline = [
    ...translationPipeline,
    {
      $match: handleMatch(mode, language), // Apply match condition based on mode
    },
    ...sort,
    ...handlePipeline(pipeline),
  ];
  return this.aggregate(finalPipeline);
};

const lookpWithTranslate = ({ localField, foreignField, from }) => {
  return {
    $lookup: {
      from,
      let: { localId: `$${localField}` },
      pipeline: [
        {
          $match: {
            $expr: { $eq: [`$${foreignField}`, "$$localId"] },
          },
        },
        {
          $lookup: {
            from: "translations",
            localField: "_id",
            foreignField: "ref",
            as: "translations",
            pipeline: [
              { $match: { language: "$$rootLanguage" } },
              {
                $project: {
                  key: 1,
                  value: 1,
                  slug: 1,
                  language: 1,
                },
              },
            ],
          },
        },
        {
          $addFields: {
            translations: {
              $arrayToObject: {
                $map: {
                  input: "$translations",
                  as: "translation",
                  in: {
                    k: "$$translation.key",
                    v: "$$translation.value",
                  },
                },
              },
            },
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: ["$$ROOT", "$translations"],
            },
          },
        },
        { $project: { translations: 0 } },
      ],
      as: localField,
    },
  };
};

export { aggregateWithTranslation, lookpWithTranslate };
