import React from "react";
import "./game-panel.css";
import { CARDS_LOGOS } from "../../constants";
import Card from "../card/card.component";
export default function GamePanel() {

    console.log("CARDS_LOGOS:", CARDS_LOGOS);

    const GerarCartas = () => {
        let nrElementos = CARDS_LOGOS.length;
        const cartas = [];
        for (let i = 0; i < nrElementos; i++) {
            cartas.push(<Card key={i} name={CARDS_LOGOS[i]} />)
        }
        return cartas;
    }

    return (
 
            <section id="panel-game">
                <h3 class="sr-only">Peças do Jogo</h3>
                <div id="game">
                    {CARDS_LOGOS.forEach(
                        (elemento) => { return <Card name={elemento} /> }
                    )}
                    {CARDS_LOGOS.slice(0,6).map(
                        (elemento, indice) => { return <Card key={indice} name={elemento} /> }
                    )}



                    { /* GerarCartas() */ }
                </div>
            </section>
        
    );
}
