// （API_KEY には、"取得したAPIキー" を記述）
API_KEY = "0d80aa491a938761419b645d1c2fa107";

$(function(){
	// 「検索#btn」ボタンがクリックされたときの処理を、それ以後の行に記述
	$('#btn').on('click', function(){
	　	// 入力された都市名でWebAPIに天気情報をリクエスト
		// $.ajax()は、Ajaxを実装するメソッド
		$.ajax({
			// url:では、APIにリクエストするURLを指定
			// 今回は、http:〜appid = "取得したAPI"
			// val()は、HTMLのvalue属性を取得する
			url: "http://api.openweathermap.org/data/2.5/weather?q=" + $('#cityname').val() + "&units=metric&appid=" + API_KEY,
			// dataTypeでは、レスポンスとして取得したいデータの型を指定
			// 今回はJSONで受け取りたいので、 dataType : 'jsonp',と記述
			dataType : 'jsonp',
		// .done()は通信に成功した場合、.fail()は失敗した場合に記述するメソッド
		}).done(function (data){
			// 通信成功、Web APIが正常に呼び出せたことを意味しています
			// (data)で引数内に取得した結果が入ります
			// 位置
	        $('#place').text(data.name);
	        // 最高気温
	        // $('#id名').text(JSONから欲しい値)の形で指定すると、指定したidのテキストを、
	        // JSONから受け取った値に変換されます
	        $('#temp_max').text(data.main.temp_max);
	        // 最低気温
	        // データはAPI_KEYで指定したAPIサーバのdata.main.temp_maxから引用している
	        $('#temp_min').text(data.main.temp_min);
	        //　湿度
	        // データは”data.JSONのオブジェクト名.プロパティ名"で取得
	        $('#humidity').text(data.main.humidity);
	        //　風速
	        $('#speed').text(data.wind.speed);
	        // 天気
	        $('#weather').text(data.weather[0].main);
	        // 天気アイコン
	        // $(要素名).attr(属性名,値);と指定すると、img要素にsrc属性とalt属性が追加
	        // これにより、天気のアイコンを表示する
	        $('img').attr("src","http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
	        $('img').attr("alt",data.weather[0].main);
		}).fail(function (data){
			alert('通信に失敗しました。');
			// 通信失敗
		});
	});
});