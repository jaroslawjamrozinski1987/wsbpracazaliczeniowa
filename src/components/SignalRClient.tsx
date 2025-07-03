import React, { useEffect } from "react";
import * as signalR from "@microsoft/signalr";

export const SignalRClient: React.FC = () => {
  useEffect(() => {
    const connect = async () => {
      try {
        // 1️⃣ Pobierz dane negotiate
        const res = await fetch("https://negotiatefunction-bhavdyejedghfufu.francecentral-01.azurewebsites.net/api/negotiate");
        const info = await res.json();

        console.log("Negotiate info:", info);

        // 2️⃣ Utwórz połączenie
        const connection = new signalR.HubConnectionBuilder()
          .withUrl(info.url, {
            accessTokenFactory: () => info.accessToken
          })
          .configureLogging(signalR.LogLevel.Information)
          .build();

        // 3️⃣ Subskrybuj event
        connection.on("documentCreated", (message) => {
          console.log("Received documentCreated:", message);
        });

        // 4️⃣ Start połączenia
        await connection.start();
        console.log("SignalR connected!");

      } catch (err) {
        console.error("SignalR error:", err);
      }
    };

    connect();
  }, []);

  return (
    <div>
      <h3>SignalR Client</h3>
      <p>Open console to see incoming messages.</p>
    </div>
  );
};