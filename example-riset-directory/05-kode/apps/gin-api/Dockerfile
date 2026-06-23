FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY go.mod .
COPY . .
RUN go mod tidy
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o gin-api ./cmd/main

FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/gin-api .
EXPOSE 8080
CMD ["./gin-api"]
