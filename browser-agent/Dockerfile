FROM node:22-bookworm

WORKDIR /agent
COPY package.json ./
RUN npm install --omit=dev && npx playwright-cli install-browser --with-deps && npx playwright-cli install --skills
COPY worker.js ./

ENV PORT=8787
EXPOSE 8787
CMD ["node", "worker.js"]
