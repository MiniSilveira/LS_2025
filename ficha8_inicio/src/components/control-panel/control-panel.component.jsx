import React, { useState } from "react";
import './control-panel.css'

export default function ControlPanel() {
    
    const [nomeVar, setNomeVar] = useState('VALOR INICIAL');
    const [jogoIniciado, setJogoIniciado] = useState(false);
    const[contador, setContador] = useState(0);
    const handleClickBotaoIniciar = ()=>{
        setJogoIniciado(!jogoIniciado);
        setContador(contador + 1);
    }
    return (
    <section id="panel-control">
        <p>O valor da var "nomeVar" é: {nomeVar}</p>
        <p>O jogo está: {jogoIniciado? "iniciado!" : "Por Iniciar"}</p>
        <p>Numero de vezes que cliquei no botão: {contador}</p>
        <h3 className="sr-only">Escolha do Nível</h3>
        <form className="form">
            <fieldset className="form-group">
                <label htmlFor="btLevel">Nível:</label>
                <select id="btLevel">
                    <option value=
                        "0">Seleccione...</option>
                    <option value="1">Básico (2x3)</option>
                    <option value="2">Intermédio (3x4)</option>
                    <option value="3">Avançado (4x5)</option>
                </select>
            </fieldset>
            <button type="button" id="btPlay" onclick='handleClickBotaoIniciar'>Iniciar Jogo</button>
        </form>
        <div className="form-metadata">
            <p id="message" role="alert" className="hide" >
                Clique em Iniciar o Jogo!
            </p>
            <dl className="list-item left">
                <dt>Tempo de Jogo:</dt><dd id="gameTime">0s</dd>
            </dl>
            <dl className="list-item right">
                <dt>Pontuação TOP:</dt><dd id="pointsTop">0</dd>
            </dl>
            <dl className="list-item left">
                <dt>Pontuação:</dt><dd id="points">0</dd>
            </dl>
            <div id="top10" className="right">
                <button id="btTop">Ver TOP 10</button>
            </div>
        </div>
    </section >
    );
};
