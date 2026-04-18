import React, {useEffect,useState} from "react";
import axios from 'axios';

function Crud (){
    const [data, setData] = useState([]);
    const [Fullname, setName]= useState("");
    const [Age, setAge]= useState("");
    const [City,setCity]= useState("");
    const [Phone, setPhone]= useState("");
    const [Tourplace, setTourplace]= useState("");
    const [Range, setRange]= useState("");

    const handleInitialize = () =>{
        axios.get('http://localhost:8000/info/get').then ((res)=>{
            return res
        }).then ((res)=> {
            SetData(res.data.dt)
        }).catch((err)=>{
            console.log(err)
        })
    }
    useEffect (()=>{
        handleInitialize()
    }, [])
    const handleSubmit = (e) =>{
        e.preventDefault()

        var data = {Name:Fullname,Age:Age,City:City,Phone:Phone,Range:Range,Tourplace:Tourplace}
        axios.post('http://localhost:8000/info/create',data).then((res)=>{
            return res

        }).catch ((err)=>{
            console.log(err)
        })
        handleInitialize()
    }

    const handleDelete = (item)=>{
        console.log(item);
        axios.delete('http://localhost:8000/info/del/${item.id}').then(res =>{
            return res
        })
        handleInitialize()
    }
    return(
        <>
        <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input type="text" value={Fullname} onChange={(a)=>setName(a.target.value)}/>
            <label>Age</label>
            <input type="number" value={Age} onChange={(b)=>setAge(b.target.value)}/>
            <label>City</label>
            <input type="text" value={City} onChange={(c)=>setCity(c.target.value)}/>
            <label>Phone</label>
            <input type="number" value={Phone} onChange={(d)=>setPhone(d.target.value)}/>
            <label>Range</label>
            <input type="text" value={Range} onChange={(e)=>setRange(e.target.value)}/>
            <label>Tourplace</label>
            <input type="text" value={Tourplace} onChange={(f)=>setTourplace(f.target.value)}/>
        </form>
        <table>
            <tr>
                <th>Name</th>
                <th>Age</th>
                <th>City</th>
                <th>Phone</th>
                <th>Range</th>
                <th>Tourplace</th>
            </tr>
            { data.map(item=>{
                return(
                    <tr>
                        <td>{item.Fullname}</td>
                        <td>{item.Age}</td>
                        <td>{item.City}</td>
                        <td>{item.Phone}</td>
                        <td>{item.Range}</td>
                        <td>{item.Tourplace}</td>

                        <button onClick={(e)=>handleDelete(item)}>delete</button>

                    </tr>
                )
            })}
        </table>
        </>
    )
}
export default Crud;