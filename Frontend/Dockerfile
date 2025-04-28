FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
RUN npm i @rollup/rollup-linux-x64-musl --save-dev
RUN npm i
COPY . .
EXPOSE 4201 4202
CMD sh -c "if [ \"$APP_MODE\" = \"dev-admin\" ]; then npm run dev-admin --verbose; \
           elif [ \"$APP_MODE\" = \"dev-learner\" ]; then npm run dev-learner; \
           elif [ \"$APP_MODE\" = \"dev-all\" ]; then npm run dev-all; \
           else echo \"Invalid APP_MODE\"; exit 1; fi"
