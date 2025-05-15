import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

// Basis-URL und Token
const baseURL = "http://localhost:3030";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjVAbWFpbC5jb20iLCJpYXQiOjE3NDczMDczMTAsImV4cCI6MTc0NzMxMDkxMCwic3ViIjoiNyJ9.vxo3VZUuOGXq7IRbVzMbNgFN2NPy8AKyVI5-0uqVPL8";

// Axios-Instanz erstellen
const instance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, // Bearer Token für Authentifizierung
  },
});
