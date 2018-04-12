(function($){
  $("#form").on("submit", getQuerstion);
  $("#form textarea").on("keydown", listenKey);

  var keyArr = [];

  /* Получение сообщения */
  function getQuerstion(e){

    if(e.target.tagName.toLowerCase() === "form") {
      e.preventDefault();
      _this = $(this);
    } else {
      _this = $("#form");
    }

    var message = _this.find('textarea').val();
    $('.reviews').append(setMsg(message));
    _this[0].reset();
  }

  /* Получаем сообщение и добавляем в блок сообщений */
  function setMsg(msg) {
    if(msg.length === 0) return;
    var userName = 'Имя спрашивающего';
    var time = setTime();
    var month = getMonthName(time.month);
    var block = '<div class="reviews__content"><p class="reviews__content-title"><span class="username">'+userName+'</span><span class="date">'+time.day+' '+month+' '+time.year+'</span></p><p class="reviews__content-txt">'+msg+'</p></div></div>';
    return block;
  }

  /* Получаем время отправки сообщения */
  function setTime() {
    var time = new Date();
    var res = {};
    res.day = time.getDate();
    res.month = time.getMonth();
    res.year = time.getFullYear();
    return res;
  }

  /* Получаем название месяца */
  function getMonthName(m){
    var name = "";
    switch(m){
      case 0 : name = "января";
        break;
      case 1 : name = "февраля";
        break;
      case 2 : name = "марта";
        break;
      case 3 : name = "апреля";
        break;
      case 4 : name = "мая";
        break;
      case 5 : name = "июня";
        break;
      case 6 : name = "июля";
        break;
      case 7 : name = "августа";
        break;
      case 8 : name = "сентября";
        break;
      case 9 : name = "октября";
        break;
      case 10 : name = "ноября";
        break;
      case 11 : name = "декабря";
        break;
      default : name = "месяца";
    }

    return name;
  }

  /* Отследим какие клавиши нажимают */
  function listenKey(e){
    if( e.keyCode === 17 ) {
      keyArr.push(e.keyCode);
    }
    if( e.keyCode === 13 ) {
      keyArr.push(e.keyCode);
    }
    if( keyArr[0] === 17 && keyArr[1] === 13 ) {
      getQuerstion(e);
    }
    setTimeout(function(){
      keyArr = [];
    }, 200);
  }

})(jQuery);
