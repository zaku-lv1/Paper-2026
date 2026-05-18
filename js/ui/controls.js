export function bindControls(init){

    document.getElementById("conc")
        .oninput = (e)=>{

        document.getElementById("concVal")
            .innerText =
            parseFloat(e.target.value)
            .toFixed(2);

        init();
    };

    document.getElementById("agent")
        .onchange = ()=>{

        init();
    };
}