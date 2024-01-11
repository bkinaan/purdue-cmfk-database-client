import axios from "axios";
import { useState, ChangeEvent, FormEvent } from "react";

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadType, setUploadType] = useState<"mentors" | "buddies">(
    "mentors"
  );

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setUploadType(e.target.value as "mentors" | "buddies");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(
      `http://localhost:8080/api/v1/${uploadType}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      console.log("File uploaded successfully");

      const response = await axios.get(
        `http://localhost:8080/api/v1/${uploadType}`
      );
      if (uploadType === "mentors") {
        // setMentors(response.data); // mentors displayed on seperate page
        console.log("Uploaded successfully");
      }
    } else {
      console.error("Error uploading file");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select value={uploadType} onChange={handleUploadTypeChange}>
          <option value="mentors">Mentors</option>
          <option value="buddies">Buddies</option>
        </select>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
