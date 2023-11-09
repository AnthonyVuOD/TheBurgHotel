# Start your image with a node base image
#FROM node:18-alpine
FROM openjdk:21


# The /app directory should act as the main application directory
#WORKDIR /app

# Copy the app package and package-lock.json file
#COPY package*.json ./
#COPY ./target/D387_sample_code-0.0.2-SNAPSHOT.jar ./target/D387_sample_code-0.0.2-SNAPSHOT.jar
COPY target/D387_sample_code-0.0.2-SNAPSHOT.jar app.jar

# Copy local directories to the current local directory of our docker image (/app)
#COPY ./src ./src

# Install node packages, install serve, build the app, and remove dependencies at the end
#RUN npm install \
#    && npm install -g serve \
#    && npm run build \
#    && rm -fr node_modules

EXPOSE 3000

# Start the app using serve command
#CMD [ "serve", "-s", "build" ]
ENTRYPOINT ["java","-jar","/app.jar"]








