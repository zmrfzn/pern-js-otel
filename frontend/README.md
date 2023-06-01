
This project was bootstrapped with [Vite](https://vitejs.dev/) and [React](https://reactjs.org/).

## Environment variables

### New Relic license
.env.local
```
VITE_APP_NR_LICENSE='<YOUR NEW RELIC INGEST LICENSE>'
```

### OpenTelemetry collector endpoint
.env.local
```
VITE_APP_OTLP_URL='https://otlp.nr-data.net:4318/v1/traces'
```

### API endpoint
.env.local
```
VITE_APP_API_URL='http://localhost:8080/api'
```(https://vitejs.dev/)

### Set port
.env
```
PORT=8081
```

## Project setup

In the project directory, you can run:

```
npm install
```

### running the app

```
npm run dev
```

Open [http://localhost:8081](http://localhost:8081) to view it in the browser.

The page will reload if you make edits.
