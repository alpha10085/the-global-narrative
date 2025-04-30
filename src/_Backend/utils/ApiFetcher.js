import mongoose from "mongoose";

export class ApiFetcher {
  constructor(pipeline, searchQuery, options = {}) {
    this.pipeline = Array.isArray(pipeline) ? pipeline : [];
    this.ApiFetcherPipeline = null;
    this.searchQuery = searchQuery;
    this.metadata = {};
    this.options = options || {};
  }
  // Pagination method
  pagination() {
    const pageNumber = parseInt(this.searchQuery.page, 10) || 1;
    const pageLimit = parseInt(this.searchQuery.pagelimit, 10) || 20;
    const skip = (pageNumber - 1) * pageLimit;
    this.ApiFetcherPipeline = [...this.pipeline];
    this.pipeline.push({ $skip: skip }, { $limit: pageLimit });
    this.metadata = { page: pageNumber, pageLimit };
    return this;
  }
  // Filter method
  filter() {
    if (!this.searchQuery.filters) {
      return this;
    }

    try {
      let query = JSON.stringify(this.searchQuery.filters);
      query = query
        // Remove any occurrences of $ to prevent injection
        .replace(/\$/g, "")
        // Add $ prefix to MongoDB operators
        .replace(
          /("(gt|gte|lt|lte|regex|ne|eq)":)/g,
          (match) => `"$${match.slice(1)}`
        )
        // Convert boolean strings to actual booleans
        .replace(/"true"|"false"/g, (match) => match === '"true"')
        // Handle comma-separated values and convert them to arrays
        .replace(/"([^"]+)":\s*"([^"]*?)"/g, (match, key, value) => {
          if (value.includes(",")) {
            const arrayValue = value
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean);
            return key === "$in"
              ? `"${key}": ${JSON.stringify(arrayValue)}`
              : `"${key}": { "$in": ${JSON.stringify(arrayValue)} }`;
          }
          return `"${key}": "${value}"`;
        });

      // Parse the modified JSON string back to an object
      const parsedQuery = JSON.parse(query);

      if (Object.keys(parsedQuery).length > 0) {
        this.pipeline.push({ $match: parsedQuery });
      }
    } catch (error) {
      console.error("Error parsing or transforming filters:", error);
      // Handle the error appropriately (e.g., throw or return a safe default)
    }

    return this;
  }
  // Sort method
  sort() {
    try {
      if (this.searchQuery.sort) {
        const sortBy = `${this.searchQuery?.sort},_id:asc`
          ?.split(",")
          ?.reduce((acc, field) => {
            const [key, order] = field.split(":");
            acc[key] = order === "desc" ? -1 : 1;
            return acc;
          }, {});
        this.pipeline.push({ $sort: sortBy });
      } else {
        this.pipeline.push({ $sort: { _id: -1 } }); // Default sort order
      }
    } catch (error) {
      console.log("🚀 ~ ApiFetcher ~ sort ~ error:", error);
    }
    return this;
  }
  // Select method
  select() {
    const { fields } = this.searchQuery;

    if (fields) {
      try {
        const parsedFields = (
          Array.isArray(fields) ? fields : fields.split(",")
        )
          .filter(Boolean)
          .reduce((acc, field) => {
            const key = field.startsWith("-") ? field.substring(1) : field;
            acc[key] = field.startsWith("-") ? 0 : 1;
            return acc;
          }, {});

        this.pipeline.push({ $project: parsedFields });
      } catch (error) {
        console.log("🚀 ~ ApiFetcher ~ select ~ error:", error);
      }
    }

    return this;
  }
  // Search method
  search() {
    try {
      if (this.searchQuery.search) {
        const indexQueries = (this?.options?.searchfields || [])?.map(
          (key) => ({
            [key]: { $regex: this.searchQuery.search, $options: "i" },
          })
        );
        if (indexQueries.length) {
          this.pipeline.push({ $match: { $or: indexQueries } });
        }
      }
    } catch (error) {
      console.log("🚀 ~ ApiFetcher ~ search ~ error:", error);
    }

    return this;
  }
  // Populate method
  populate() {
    return this;
  }
  // Method to get total count of documents after applying filters
  async count(model) {
    const pipeline = this?.ApiFetcherPipeline;
    if (!pipeline) return 0;

    let countPipeline = [...pipeline, { $count: "totalCount" }];
    let queryFN = this.options?.isTranslated
      ? model.aggregateWithTranslation
      : model.aggregate;
    // Ensure you are calling the aggregation function directly on the model
    const result = await queryFN.call(model, countPipeline, {
      language: this.options.language,
      mode: this.options.mode,
    });

    return result.length > 0 ? result[0].totalCount : 0;
  }
}
