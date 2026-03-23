# Base image (nginx ready)
FROM nginx:alpine

# Default nginx files remove
RUN rm -rf /usr/share/nginx/html/*

# Working directory set (optional but clean practice)
WORKDIR /usr/share/nginx/html/

# Saari frontend files copy
COPY . .

# Custom nginx config copy
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Port expose
EXPOSE 80
