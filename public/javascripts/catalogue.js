$.getJSON('../json/bottles.json', function (data) {
  var bottlesRow = $('#bottlesRow');
  var bottlesTemplate = $('#bottlesTemplate');

  for (i = 0; i < data.length; i++) {
    bottlesTemplate.find('.panel-title').text(data[i].name);
    bottlesTemplate.find('img').attr('src', data[i].picture);
    bottlesTemplate.find('.bottles-olives').text(data[i].olives);
    bottlesTemplate.find('.bottles-flavour').text(data[i].flavour);
    bottlesTemplate.find('.bottles-year').text(data[i].year);
    bottlesTemplate.find('.bottles-location').text(data[i].location);
    bottlesTemplate.find('.bottles-price').text(data[i].price);
    bottlesTemplate.find('.bottleTemplate').attr('data-id', data[i].id);

    bottlesRow.append(bottlesTemplate.html());
    //let account;
  }})
