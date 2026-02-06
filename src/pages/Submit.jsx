import { useState } from "react"
import { supabase } from "../lib/supabase"

export default function Submit() {
  const [file,setFile] = useState(null)
  const [preview,setPreview] = useState(null)
  const [form,setForm] = useState({})

  function handleFile(e){
    const f = e.target.files[0]
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  async function submit(e){
    e.preventDefault()

    let photoUrl=null

    if(file){
      const { data } = await supabase.storage
        .from("photos")
        .upload(`${Date.now()}-${file.name}`,file)

      photoUrl=data.path
    }

    await supabase.from("reports").insert([{
      ...form,
      photo_url:photoUrl,
      status:"pending"
    }])

    alert("Submitted!")
  }

  return (
    <div className="container">
      <form onSubmit={submit} className="card">

        <h2>Submit Report</h2>

        <select onChange={e=>setForm({...form,category:e.target.value})}>
          <option>Safety</option>
          <option>Cleanliness</option>
          <option>Facility</option>
        </select>

        <textarea
          placeholder="Describe issue"
          onChange={e=>setForm({...form,description:e.target.value})}
        />

        <input
          placeholder="Location"
          onChange={e=>setForm({...form,location:e.target.value})}
        />

        <input type="file" onChange={handleFile}/>

        {preview && <img src={preview} className="preview"/>}

        <button className="btn primary">Submit</button>
      </form>
    </div>
  )
}
