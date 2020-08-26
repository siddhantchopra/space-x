import React, {useState, useEffect, useLayoutEffect} from 'react'
import { Filter } from './filter'
import { Cards } from './cards'
import axios from 'axios'
import {baseURL} from './constant'

export const Dashboard = (props) => {
    let [data, setData] = useState()
    let [isLoading, setLoading] = useState(true)
    let cancelToken;

    useLayoutEffect(()=>{
        axios.get(baseURL).then((res)=>{
            let arr = []
            arr.push(res.data)
            setData(...arr)
            setLoading(false)
            props.history.push('/search')
        })
    },[])

    // useLayoutEffect(() => {
    //     props.history.push('/search')
    // }, [])
    
    const getData=(obj)=>{
        setLoading(true)
        if(Object.keys(obj).length > 0){
            // let query = `&launch_success=${obj.launch ?obj.launch: ''}&land_success=${obj.land ?obj.land : ''}&lauch_year=${obj.year ?obj.year:''}`
            let query = `${obj.launch ?'&launch_success='+obj.launch: ''}${obj.land ?'&land_success='+obj.land : ''}${obj.year ?'&lauch_year='+obj.year:''}`
            let url =`${baseURL+query}`
               
                if (typeof cancelToken != typeof undefined) {
                    cancelToken.cancel("Operation canceled due to new request.");
                  }
           
                  cancelToken = axios.CancelToken.source();

            axios.get(url,  { cancelToken: cancelToken.token }).then((res)=>{
                let arr = []
                arr.push(res.data)
                setData(...arr)
                props.history.push('/search?'+query)
                setLoading(false)
            }).catch(error => {
                if (axios.isCancel(error)) {
                  console.log('Request canceled', error);
                } else {
                  console.log(error);
                }
             });

        }
    }
 
    return (
        <div className="container-fluid">
            <h2 className="pl-2">SpaceX Launch Programs</h2>
                {isLoading && <h3 className="text-center">Loading...    </h3>}
            <div className="row">
                <div className="col-lg-3 col-xl-2 col-md-4 col-sm-12"><Filter filterObject={getData}/> </div>
                <div className="col-lg-9 col-xl-10 col-md-8 col-sm-12"><Cards data={data}/></div>
            </div>
            <h3 className="text-center">Developed By: Siddhant Chopra</h3>
        </div>
    )
}
