import swaggerAutogen from "swagger-autogen";
import template from "./swagger_template.js";
const outputFile = "./swagger_output.json";
const endpointsFiles = ["./index.js"];

swaggerAutogen()(outputFile, endpointsFiles, template);
