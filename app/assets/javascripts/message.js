$(function(){ 
  var buildHTML = function(message) {
    if (message.content && message.image) {
      var html = `<div class="main-chat__message-list__message" data-message-id=${message.id}>
        <div class="main-chat__message-list__message__info">
          <div class="main-chat__message-list__message__info__member">
            ${message.user_name}
          </div>
          <div class="main-chat__message-list__message__info__date">
            ${message.created_at}
          </div>
        </div>
        <div class="main-chat__message-list__message__text">
          <p class="main-chat__message-list__message__text__content">
            ${message.content}
          </p>
          <img src=${message.image} class="main-chat__message-list__message__text_image" >
        </div>
      </div>`
    } else if (message.content) {
      var html = `<div class="main-chat__message-list__message" data-message-id=${message.id}>
        <div class="main-chat__message-list__message__info">
          <div class="main-chat__message-list__message__info__member">
            ${message.user_name}
          </div>
          <div class="main-chat__message-list__message__info__date">
            ${message.created_at}
          </div>
        </div>
        <div class="main-chat__message-list__message__text">
          <p class="main-chat__message-list__message__text__content">
            ${message.content}
          </p>
        </div>
      </div>`
    } else if (message.image) {
      var html = `<div class="main-chat__message-list__message" data-message-id=${message.id}>
        <div class="main-chat__message-list__message__info">
          <div class="main-chat__message-list__message__info__member">
            ${message.user_name}
          </div>
          <div class="main-chat__message-list__message__info__date">
            ${message.created_at}
          </div>
        </div>
        <div class="main-chat__message-list__message__text">
          <img src=${message.image}class="main-chat__message-list__message__text__image">
        </div>
      </div>`
    };
    return html;
  };
$('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-chat__message-list').append(html);
      $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      $('form')[0].reset();
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    })
});
  var reloadMessages = function() {
    var last_message_id = $('.main-chat__message-list__message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.main-chat__message-list').append(insertHTML);
      $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('メッセージの更新に失敗しました')
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});