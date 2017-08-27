var cheerio = require('cheerio');
var fs      = require('fs');

fs.readFile('./index_novo.html', 'utf8', function (err, html) {
  if (err) {
    return console.log(err);
  }
  // Carregando HTML
  var $ = cheerio.load(html);
  // Coleção de musiquinhas legais
  var musiquinhas = [];
  // Usando a classe .post como "pai" e "loop"
  $('.posts').each(function (key, posts) {
    // O que tem um post ?
    var post      = {
      description : '',
      playlist    : []
    };
    // Com os dados do post em mãos vamos buscar suas músicas
    $(posts).find('table tbody tr').each(function (key, musics) {
      // Coleção de dados da música
      var data = [];
      // Cada mpusica está em uma linha da "table" e cada dado em uma coluna
      // Vamos buscar dado por dado e formar nossa coleçao "data"
      $(musics).find('td').each(function (key, music) {
        data.push($(music).text());
      });
      // Com os dados da música vamos formar o objeto dela
      var music = {
        artist  : data[0],
        name    : data[1],
        album   : data[2],
        download: $(this).find('a').attr('href')
      };
      // E inserir o objeto na playlist do "post"
      post.playlist.push(music);
    });
    // Por fim buscamos a descrição do "post"
    post.description = $($(this).find('.posts-title')[0]).text()
    // E inserimos o post na coleção de musiquinhas legais
    musiquinhas.push(post);
  });

  // FIM
  console.log(JSON.stringify(musiquinhas));
});
