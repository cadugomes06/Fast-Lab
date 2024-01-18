import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

const testPage = () => {
    const [forms, setForms] = useState([])

    const formsCollectionRef = collection(db, "formulario");

  useEffect(() => {
    const getForms = async () => {
      const data = await getDocs(formsCollectionRef);
      const docs: any = data.docs.map((doc) => ({...doc.data(), id: doc.id }));
      setForms(docs);
    };
    getForms();
  }, []);

  return (
    <div>Fazer chamadas na api</div>
  )
}

export default testPage