$(function() {

    $('#cargar').click(function(){
        id = ID;
        if($('#cadena').val() == ""){
            $(this).popover('show');
            return false;
        }else{
            updateNetwork(9);
            $(this).popover('hide');
            Stop();
            Clear();
            ClearRows(4);
            LoadString(id);    
            return true;
        }
    });
    $('#evaluar').click(

        function(){
            Stop();
            id = ID;
            time = 1000 - $("#rango").val();
            Tick = setInterval(function(){Evaluate(id)}, time);
        }

    );
});

function AddBlank(table){
    for(i = 0; i < 100; i++){
        AddRow(BLANK, "", "", table);
    }
    return true;
}

function LoadString(table){
    var cadena = $('#cadena').val();
        ClearRows(table);
        AddRow('Ɛ', "active-row", "bg-info text-light", table);
        for(i = 0; i < cadena.length; i++){
            AddRow(cadena.charAt(i), "", "", table);
        }
        AddBlank(table);
        return true;
}

function EvaluateStep(symbol, id){
    Machines[id].Count++;
    symbols = Machines[id][Machines[id].State]
    NextValues = symbols[symbol];
    updateNetwork(NextValues[3]);
    setTimeout(function(){resetEdges()}, time+(time/4));
    if(symbols[symbol] == undefined) return { Error : true, Acceptable : Machines[id].Functions.Acceptable(Machines[id].State), Message : `El símbolo <strong>'${symbol}'</strong> no tiene transición definida en el estado <strong>${Machines[id].State}</strong> de esta máquina. ${symbols.ERROR ? symbols.ERROR : ''}`};
    Machines[id].State = NextValues[1];
    return { Error : false, Acceptable: Machines[id].Functions.Acceptable(Machines[id].State), Output : NextValues[0], Movement : NextValues[2] };
}

function Evaluate(id){
        chain = $("#tabla" + id + " td");
        i = Machines[id].i;
        if(!Machines[id].Functions.Acceptable(Machines[id].State) && chain.length > i && Machines[id].Count < 10000){
            time = 1000 - $("#rango").val();
            result = EvaluateStep(chain[i].textContent.trim(), id);
            if(result.Error){
                Update();
                Stop();
                $('#modalTitle').html('¡Error!');
                $('#modalText').html(result.Message);
                $('#myModal').modal('show');
               
            }else{
                if (i >= chain.length - 2) AddBlank(id);
                chain[i].textContent = (result.Output);
                i += result.Movement;
                Machines[id].i += result.Movement;
                chain[i].setAttribute('id', 'new-row');
                ChangeActiveRow(id, time);
                Update();
            }

            
        }else{
            if(Machines[id].Functions.Acceptable(Machines[id].State)){
                Update();            
                Stop();   
            }
            if(Machines[id].Count >= 10000){
                Update();
                Stop();
                $('#modalTitle').html('¡Error!');
                $('#modalText').html('La cadena ingresada ha generado muchas transiciones sin definir un resultado.');
                $('#myModal').modal('show');
            }
        }

        
}
function Stop(){
    clearInterval(Tick);
}
// SYNTAXIS Machine[CURRENT_STATE] = { INCOMING_SYMBOL: [OUTPUT_SYMBOL, NEXT_STATE, HEAD_MOVEMENT]}
function SetMachine4(){

    Machines[4][0] = {
        'Ɛ' : ['Ɛ', 1 , 1, 9]
    }
    Machines[4][1] = {
        'a' : ['a', 1, 1, 3],
        'b' : ['a', 1, 1, 2],
        '' : ['a', 1, 1, 1],
        'Ɛ' : ['Ɛ', 2, -1, 4] 
    }
    Machines[4][2] = {
        'a' : ['a', 2, -1, 5],
        'Ɛ' : ['Ɛ', 3, 1, 6]
    }
    Machines[4][3] = {
        'a' : ['a', 10, 0]
    }
    Machines[4]['i'] = 0;
    Machines[4]['Count'] = 0;
    Machines[4]['State'] = 0;
    Machines[4]['Functions'] = {
        Acceptable(state) { return state == 3 }
    };
}
