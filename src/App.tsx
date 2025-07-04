import { useState, useEffect } from "react";
import "./App.css";
import type { Document } from "./types/Document";
import * as signalR from "@microsoft/signalr";
import { toast } from "react-toastify";
import DocumentGrid from "./components/DocumentGrid";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [requests, setRequests] = useState<Document[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);


const connectToSignalR = async () => {
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

          toast.info("Nowe zdarzenie o id " + message + " odświeżanie danych...");
          fetchData();
        });

        // 4️⃣ Start połączenia
        await connection.start();
        console.log("SignalR connected!");
        toast.info("Połączenie SignalR nawiązane!");
      } catch (err) {
        console.error("SignalR error:", err);
        toast.error("Błąd połączenia SignalR: " + (err as Error).message);
      }
    };

    const fetchData = () => {
      fetch("https://dataproviderfunc-dfgkb8bfe6gacef2.polandcentral-01.azurewebsites.net/api/dataproviderfunc")
      .then(res => res.json())
      .then(data => {
        setRequests(data);
        toast.success("Dane pobrane pomyślnie!");
      })
      .catch(err => {
        toast.error("Błąd podczas pobierania danych: " + (err as Error).message);
      });
    }

  // Pobieranie listy plików
  useEffect(() => {
    console.log('fetching...');
      fetchData();

      connectToSignalR();
  }, []);

  const handleFileChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: any) => {
    e.preventDefault();
    if (!file) {
      alert("Select a file first.");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://sendrequestfunc-hxazggbbewebgmgj.polandcentral-01.azurewebsites.net/api/sendrequestfunc", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error("Upload failed.");
      }

      toast.success("wysłano plik");
    } catch (err) {
      toast.error("Błąd podczas przesyłania pliku: " + (err as Error).message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="App" style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h2>Upload File</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit" disabled={!file || uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>

      <h3 style={{ marginTop: "2rem" }}>Zdarzenia</h3>
      {requests.length === 0 ? (
        <p>Brak danych.</p>
      ) : (
        <DocumentGrid documents={requests} />        
      )}
    </div>
  );
}

export default App;