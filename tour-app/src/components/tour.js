
import React, { memo, useEffect, useState } from "react";
import { Card, Container, Nav } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import Api, { endpoints } from "../configs/Api";
import Item from "../layout/Item";

function Tour() {
    const [tour, setTours] = useState([])
    const [q] = useSearchParams()

    useEffect(() => {
        const loadTours = async () => {
            let query = ""
            let kw = q.get("kw")
            if (kw !== null)
                if (query === "")
                    query += `kw=${kw}`
                else
                    query += `&kw=${kw}`

            const res = await Api.get(`${endpoints['tours']}?${query}`)
            setTours(res.data)
        }

        loadTours()
    }, [q])


    return (
        <Container>
            <h1 className="text-center text-danger" onClick={() => console.log(tour)}>DANH MUC KHOA HOC</h1>

            <Nav style={{ display: "block" }}>
                {tour.map(c => {
                    console.log(Math.random())
                    return <Item id={c.id} name={c.name} images={c.images.length > 0 ? c.images[0].link : ""} price={c.tourprice[0].price > 0 ? c.tourprice[0].price : 0} startingPOS={c.startingPOS} endPOS={c.endPOS} numberofdays={c.numberofdays} />
                })}
            </Nav>
        </Container>
        
    )
}

export default memo(Tour)