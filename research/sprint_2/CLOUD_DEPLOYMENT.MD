# Cloud Architecture
Overview and architecture plan for our application top to bottom.


## Front-end
Description of utilized cloud services for hosting our application, as well as the tools utilized for developement.

### I. Cloud  Services


 **Google App Engine (GAE)**: Google Cloud offers a Platform as a Service (PaaS) called "Google App Engine" (GAE). This fully managed platform allows us to deploy, monitor, and scale applications without the overhead of infrastructure management. With GAE, we can seamlessly deploy our Next.js and React-based frontend, benefitting from automatic scaling based on our traffic needs. Integration with other Google Cloud services is also simplified, providing a cohesive environment for potential future enhancements.

**Considerations:**
  While *Firebase* offers a comprehensive set of tools for web development, including hosting, database, and authentication, we have chosen not to pursue it at this time. Our primary requirement is a reliable hosting solution for serving JavaScript, handling domain names, and ensuring SSL security. Given our anticipated light website traffic and the simplicity of our hosting needs, GAE stands out as an efficient, cost-effective choice.

### II. Development:
GAE offers support for JavaScript thus we will leverage the following JavaScript frameworks and libraries to develop our front-end app code.

- **React**: A simple and powerful JavaScript library that should allow us to build out UI.
- **Next.js**: a React framework that offers server-side rendering and static site generation, improving  performance.
  

## Back-end
### Middleware
### Compute
### Storage

