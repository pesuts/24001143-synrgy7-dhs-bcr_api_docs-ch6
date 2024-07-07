# Menggunakan image Node.js versi 18 berbasis Alpine
FROM node:18-alpine

# Set working directory ke /app
WORKDIR /app

# Salin package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin semua kode ke dalam container
COPY . .

# Salin file .env ke dalam container
COPY .env .env

# Mengekspos port 8080 untuk aplikasi
EXPOSE 8080

# Menjalankan build aplikasi (opsional tergantung kebutuhan)
RUN npm run build

# Menjalankan aplikasi dengan command yang sesuai
CMD ["npm", "run", "start-prod"]
