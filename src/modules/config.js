

import landing_schema from "./pages/landing.schema.json" with { type: "json" };
import project_schema from "./collections/project.schema.json" with { type: "json" };
import post_schema from "./collections/post.schema.json" with { type: "json" };
 const config = [{
    name: "landing",
    type: "pages",
    schema: landing_schema
},{
    name: "project",
    type: "collections",
    schema: project_schema
},{
    name: "post",
    type: "collections",
    schema: post_schema
}]


export default config;