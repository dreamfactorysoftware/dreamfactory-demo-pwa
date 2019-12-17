# dreamfactory-demo-pwa

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


# Using docker

#####For properly register Service Worker your app must be served over HTTPS.

1.  Build docker image
```
docker build . -t my-app
```

2. Run app
```
docker run -d -p 8080:80 my-app
```

