import React from "react";
import './card.css';
import { PLACEHOLDER_CARD_PATH, PLACEHOLDER_CARDBACK_PATH } from "../../constants";

export default function Card({ name }) {
    return (
        <div className="card flipped" data-logo={name}>
            <img src={PLACEHOLDER_CARDBACK_PATH} class="card-back" alt="card placeholder" />
            <img src={PLACEHOLDER_CARD_PATH + name + '.png'} className="card-front" alt={name} />
        </div>
    );
}