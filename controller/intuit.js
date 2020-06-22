var intuit = {

    popUp: {
        modal: '', 
        overlay: '',

        open: function(content) {
            intuit.popUp.modal= document.querySelector('.modal'),
            intuit.popUp.overlay= document.querySelector('.overlay'),
            intuit.popUp.modal.innerHTML = content
            intuit.popUp.overlay.style.display = "block"
            intuit.popUp.modal.style.display = "block"
        },
    
        close: function () {
            intuit.popUp.overlay.style.display = "none"
            intuit.popUp.modal.style.display = "none"
            intuit.popUp.modal.innerHTML = ''
        },
    
    },

    statistic: {
        balance:  1000,
        winScore: 0,
        loseScore:0,
        allScore: 0,
        lastgame: 0,  
        tradeHistory:[],
    },

    trade: {
        userAnsweer:   0,
        currentSecret: 0
    },

    parameters: {
        userTime: 2000,
        userRate: 0
    },

    getCurrentSecret: false,

    //ГЕТЕРЫ
    getAllScore(){
        return this.statistic.winScore+this.statistic.loseScore
    },//Суммирует выйгранные и проигранные игры в общий счетчик игр

    getCurrentSecret(){
    //показывает загаданное число компом. Переписать имена на getNhfkfkkf
        var intElem = document.getElementById("int")
        intElem.textContent=this.trade.currentSecret
        this.setTradeResults()
    },

    
    getBalance(){
        document.getElementById('balance').innerHTML = this.statistic.balance
    },//Получаем стартовый баланс



    getUserParameters(){
        this.parameters.userTime = document.getElementById('time').value
        this.parameters.userRate = document.getElementById('rate').value
    },//Считывает пользовательские время реакции на запуск трейда и пользовательскую ставку

    //SETERS
    setBalanceAfterTrade(){
        this.parameters.userRate = Number(document.getElementById('rate').value)
        if(this.statistic.lastgame == 1){
            this.statistic.winSum = this.parameters.userRate + (this.parameters.userRate * 0.7)
            this.statistic.balance += this.statistic.winSum
            return this.statistic.winSum
        }
        else{
            this.statistic.loseSum = this.parameters.userRate
            this.statistic.balance -= this.statistic.loseSum
            return this.statistic.loseSum
        }
    },//Расчитываем баланс после окончания трейда

    setRandomNumber(){
        this.trade.currentSecret = Math.floor(Math.random() * Math.floor(2))
        return this.trade.currentSecret
    },//Герезация случайного (загадонного) из двух 0-1

    setStatistic(){
        document.getElementById('win-score').innerHTML = this.statistic.winScore
        document.getElementById('lose-score').innerHTML = this.statistic.loseScore                     
        document.getElementById('all-score').innerHTML = this.getAllScore()
        this.getBalance()
    },//Обновление статистики по сыгранным играм

    setTradeHistory(){
        chek_element = document.getElementById('list')
        if (chek_element){
            chek_element.parentNode.removeChild(chek_element)
        }
        var ul = document.createElement('ul')
        ul.setAttribute('id', 'list')
        document.body.append(ul)
        for (var task in this.statistic.tradeHistory) {
            var li = document.createElement('li')
            li.textContent = this.statistic.tradeHistory[task]
            if (li.textContent.indexOf("WIN") === 2) {
                li.style.color = "green"
            }
            else {
                li.style.color = "red"
            }
            ul.appendChild(li)
            
        }
    },//Вывод истории ордеров

    setTradeEvent(userRate){
        this.getUserParameters()
        this.setRandomNumber()

        this.trade.userAnsweer = userRate

        setTimeout(function(){
            intuit.setTradeResults()
            intuit.popUp.open(document.querySelector(".statistic_window").innerHTML)
        }, intuit.parameters.userTime)

        
    },
    //Событие трейда, которое реагирует на нажатие кнопки(up- 1, down- 2). Вызывает генерацию числа, 
    //отслеживает какую кнопку нажал пользователь,
    //Вызывает проверку успеха трейда

    setLastTrade(){
        document.getElementById('your-offer').innerHTML = this.trade.userAnsweer
        document.getElementById('enchant-value').innerHTML = this.trade.currentSecret
    },

    setTradeResults(tradeSum){
        if (this.trade.userAnsweer == this.trade.currentSecret ) {
            trade.style.borderColor='green'
            document.getElementById('trade-result').innerHTML="WIN"
            this.statistic.winScore++
            this.statistic.lastgame = 1
        }else{
            trade.style.borderColor='red'
            document.getElementById('trade-result').innerHTML="LOST"
            this.statistic.loseScore++
            this.statistic.lastgame = 0
            
        }
        this.setBalanceAfterTrade()
        this.setStatistic()
        this.statistic.tradeHistory.push(this.trade.userAnsweer + ' ' + document.getElementById('trade-result').textContent + " " + intuit.setBalanceAfterTrade())
    }//Проверяет, угадал ли пользователь число, обновляет статистику
}

document.addEventListener("DOMContentLoaded", intuit.setStatistic());
