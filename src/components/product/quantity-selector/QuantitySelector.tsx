'use client';
import { CartProduct } from "@/interfaces";
import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
    quantity: number;
    onQuantityChanged: (num: number) => void;
}

export const QuantitySelector = ({ quantity, onQuantityChanged }: Props) => {

    const onValueChanged = (value: number) => {
        if (!((quantity + value) < 1)) {
            if (onQuantityChanged)
                onQuantityChanged(quantity + value);
        }
    }

    return (
        <div className="flex">
            <button>
                <IoRemoveCircleOutline size={30} onClick={() => onValueChanged(-1)} />
            </button>

            <span className="w-20 mx-3 px-5 bg-gray-100 text-center rounded">
                {quantity}
            </span>

            <button>
                <IoAddCircleOutline size={30} onClick={() => onValueChanged(1)} />
            </button>
        </div>
    )
}
