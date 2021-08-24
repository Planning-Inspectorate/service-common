FROM node:14-alpine
WORKDIR /opt/app
ENV DOCS_API_PATH=/opt/app/api
# Do not rely on NODE_ENV - exists for performance reasons only
ENV NODE_ENV=production
ENV SERVER_PORT=3000
# This will be updated to pull the latest common image
COPY --from=pinscommonukscontainers3887default.azurecr.io/planninginspectorateappealplanningdecision:960-commons-image /opt/app ../common
ADD api api
ADD src src
ADD package.json package.json
ADD package-lock.json package-lock.json
RUN npm prune --production \
  && npm rebuild
# Have left out versioning as not uploaded to npm, and will be versioned by Azure
EXPOSE 3000
USER node
CMD [ "npm", "start" ]
