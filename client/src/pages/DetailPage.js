 import React, {useState, useContext, useCallback, useEffect} from 'react'
 import {useParams} from 'react-router-dom'
 import {useHttp} from '../hooks/http.hook'
 import {AuthContext} from '../context/AuthContext'
 import {Loader} from '../components/Loader'
 import {LinkCard} from '../components/LinkCard'

// сторінка що показує конкретну силку і статистику по ній

export const DetailPage = () => {
  const {token} = useContext(AuthContext)
  const { request, loading } = useHttp()
  const [link, setLink] = useState(null)
  const linkId = useParams().id

  const getLink = useCallback(async () => {
     try {
      const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
         Authorization: `Bearer ${token}`
       })
       setLink(fetched)
     } catch (e) {}
   }, [token, linkId, request])

  useEffect(() => {
    getLink()
  }, [getLink])

    if (loading) {
        return <Loader />
    }
 return (
    <div className="linkpage">
         {!loading && link && <LinkCard link={link} />}
     </div>
 )
}
 