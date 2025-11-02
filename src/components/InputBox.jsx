import { useId } from "react";

function InputBox({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions = [],
    selectCurrency = "usd",
    amountDisable = false,
    currencyDisable = false,
    className=""
}) {
    const amountInputId = useId(); // unique id of amount-input field for linking label with it.

    const displayFormattedAmount = () => {
        try {
            return amount.toLocaleString("en-IN", { style: "currency", currency: selectCurrency })
        }
        catch(err) {
            if (err.message.includes("currency code")) {
                return amount.toLocaleString("en-IN");
            }
        }        
    }

    return (
        <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>

            {/* Label & Input */}
            <div className="w-1/2">
                <label htmlFor={amountInputId} className="text-black/40 mb-2 inline-block">
                    {label}
                </label>
                <input
                    id={amountInputId}
                    className="outline-none w-full bg-transparent py-1.5"
                    type={label === "To" ? "text" : "number"}
                    placeholder="Amount"
                    value={label === "To" ? displayFormattedAmount() : amount}
                    disabled={amountDisable}
                    onChange={(e) => onAmountChange && onAmountChange(e.target.value)}
                />
            </div>

            {/* Currency Options */}
            <div className="w-1/2 flex flex-wrap justify-end text-right">
                <label className="text-black/40 mb-2 w-full">Currency Type</label>

                <select className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none" value={selectCurrency} onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)} disabled={currencyDisable}>
                    { currencyOptions.map((currency) => (
                        <option  key={currency} value={currency}> {currency.toUpperCase()} </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default InputBox;