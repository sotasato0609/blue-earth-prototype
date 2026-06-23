/* ============================================================
   共有スクリプト: ヘッダー/フッター注入 + 各種インタラクション
   ・fetch を使わず innerHTML 注入 → file:// でもそのまま動作
   ・body[data-site]  = "be" | "mb"
   ・body[data-active]= 現在ページのナビキー
   ============================================================ */
(function () {
  var body = document.body;
  var site = body.getAttribute('data-site') || 'be';
  var active = body.getAttribute('data-active') || '';
  body.classList.add(site === 'mb' ? 'site-mb' : 'site-be');

  /* ---- ドメイン戦略の再現：BLUE EARTH と MY-BODY を別サイト（別URL）に分離し、
     相互リンクで接続する。本番では mybody.jp 等の独立ドメイン想定。 ---- */
  var BE_URL = 'https://sotasato0609.github.io/blue-earth-prototype/';
  var MB_URL = 'https://sotasato0609.github.io/mybody-prototype/';
  var EXT = '<span class="ext">↗</span>'; /* 別サイトへの遷移を示すマーク */

  function on(key) { return active === key ? ' class="active"' : ''; }

  /* ---------- BLUE EARTH ヘッダー ---------- */
  var beHeader =
    '<div class="util"><div class="wrap">' +
      '<a href="first.html">はじめての方</a>' +
      '<a href="join.html">法人会員</a>' +
      '<a href="trial.html">お問い合わせ</a>' +
      '<a href="news.html">採用情報</a>' +
    '</div></div>' +
    '<header class="site"><div class="hbar">' +
      '<a class="logo" href="index.html"><img src="assets/img/logo_teal.png" alt="BLUE EARTH"></a>' +
      '<nav class="main">' +
        '<span class="has-sub"><a' + on('services') + ' href="fitness.html">サービス ▾</a>' +
          '<span class="sub">' +
            '<a href="fitness.html">フィットネスジム</a>' +
            '<a href="studio.html">スタジオレッスン</a>' +
            '<a href="spa.html">温浴・スパ・サウナ</a>' +
            '<a href="kids.html">キッズスクール</a>' +
            '<a class="cross" href="' + MB_URL + '">24時間ジム MY-BODY ' + EXT + '</a>' +
          '</span></span>' +
        '<a' + on('stores') + ' href="stores.html">店舗を探す</a>' +
        '<a' + on('first') + ' href="first.html">はじめての方</a>' +
        '<a' + on('pricing') + ' href="pricing.html">料金プラン</a>' +
        '<a' + on('news') + ' href="news.html">お知らせ</a>' +
      '</nav>' +
      '<div class="hcta">' +
        '<a class="btn btn-ghost" href="trial.html">無料体験・見学</a>' +
        '<a class="btn btn-primary" href="join.html">WEB入会</a>' +
      '</div>' +
      '<button class="hamb" aria-label="メニュー"><span></span><span></span><span></span></button>' +
    '</div></header>';

  /* ---------- MY-BODY ヘッダー ---------- */
  var mbHeader =
    '<header class="site"><div class="hbar">' +
      '<a class="logo-mb" href="index.html"><span class="mark">M</span>MY-BODY</a>' +
      '<nav class="main">' +
        '<a' + on('feat') + ' href="index.html#feat">特徴</a>' +
        '<a' + on('pricing') + ' href="index.html#plan">料金プラン</a>' +
        '<a' + on('stores') + ' href="stores.html">店舗を探す</a>' +
        '<a' + on('syn') + ' href="index.html#syn">系列の特典</a>' +
        '<a class="cross" href="' + BE_URL + '">総合クラブ BLUE EARTH ' + EXT + '</a>' +
      '</nav>' +
      '<div class="hcta">' +
        '<a class="btn btn-ghost" href="trial.html">見学・体験</a>' +
        '<a class="btn btn-primary" href="join.html">WEB入会</a>' +
      '</div>' +
      '<button class="hamb" aria-label="メニュー"><span></span><span></span><span></span></button>' +
    '</div></header>';

  /* ---------- ドロワー（モバイル） ---------- */
  var beDrawerLinks =
    '<span class="sec">サービス</span>' +
    '<a href="fitness.html">フィットネスジム</a>' +
    '<a href="studio.html">スタジオレッスン</a>' +
    '<a href="spa.html">温浴・スパ・サウナ</a>' +
    '<a href="kids.html">キッズスクール</a>' +
    '<a class="cross" href="' + MB_URL + '">24時間ジム MY-BODY ' + EXT + '</a>' +
    '<span class="sec">ご案内</span>' +
    '<a href="stores.html">店舗を探す</a>' +
    '<a href="first.html">はじめての方</a>' +
    '<a href="pricing.html">料金プラン</a>' +
    '<a href="news.html">お知らせ</a>' +
    '<div class="dcta">' +
      '<a class="btn btn-ghost" href="trial.html">無料体験・見学</a>' +
      '<a class="btn btn-primary" href="join.html">WEB入会</a>' +
    '</div>';
  var mbDrawerLinks =
    '<span class="sec">MY-BODY</span>' +
    '<a href="index.html#feat">特徴</a>' +
    '<a href="index.html#plan">料金プラン</a>' +
    '<a href="stores.html">店舗を探す</a>' +
    '<a href="index.html#syn">系列の特典</a>' +
    '<a class="cross" href="' + BE_URL + '">総合クラブ BLUE EARTH ' + EXT + '</a>' +
    '<div class="dcta">' +
      '<a class="btn btn-ghost" href="trial.html">見学・体験</a>' +
      '<a class="btn btn-primary" href="join.html">WEB入会</a>' +
    '</div>';
  var drawer =
    '<div class="drawer" id="drawer"><div class="panel">' +
      '<button class="x" aria-label="閉じる">×</button>' +
      '<div style="clear:both"></div>' +
      (site === 'mb' ? mbDrawerLinks : beDrawerLinks) +
    '</div></div>';

  /* ---------- フッター ---------- */
  var beFooter =
    '<footer class="site"><div class="wrap">' +
      '<div class="fgrid">' +
        '<div>' +
          '<a class="logo" href="index.html"><img src="assets/img/logo_white.png" alt="BLUE EARTH" style="height:30px"></a>' +
          '<p class="corp"><span class="nm">株式会社ブルーアースジャパン</span>（センコーグループ）<br>1989年創業／総合スポーツクラブ・24時間ジム・キッズスクール・介護事業<br>山梨を中心に東京・神奈川・静岡・長野・群馬　全22店舗</p>' +
        '</div>' +
        '<div class="fcol"><h4>サービス</h4>' +
          '<a href="fitness.html">フィットネスジム</a><a href="studio.html">スタジオレッスン</a><a href="spa.html">温浴・スパ・サウナ</a><a href="kids.html">キッズスクール</a><a class="cross" href="' + MB_URL + '">24時間ジム MY-BODY ' + EXT + '</a></div>' +
        '<div class="fcol"><h4>ご案内</h4>' +
          '<a href="stores.html">店舗を探す</a><a href="pricing.html">料金プラン</a><a href="first.html">はじめての方</a><a href="news.html">お知らせ</a><a href="trial.html">無料体験・見学</a></div>' +
      '</div>' +
      '<div class="fbar"><span>© BLUE EARTH JAPAN Co.,Ltd.（プロトタイプ）</span><span>プライバシーポリシー　／　運営会社</span></div>' +
    '</div></footer>';
  var mbFooter =
    '<footer class="site"><div class="wrap">' +
      '<div class="fgrid">' +
        '<div>' +
          '<a class="logo-mb" href="index.html"><span class="mark">M</span>MY-BODY</a>' +
          '<p class="corp" style="margin-top:12px"><span class="nm">株式会社ブルーアースジャパン</span>が運営する24時間フィットネスジム<br>山梨・東京・神奈川・静岡・長野・群馬<br><a class="grp cross" style="color:var(--mb-acc)" href="' + BE_URL + '">▶ 総合スポーツクラブ BLUE EARTH はこちら ' + EXT + '</a></p>' +
        '</div>' +
        '<div class="fcol"><h4>MY-BODY</h4>' +
          '<a href="index.html#feat">特徴</a><a href="index.html#plan">料金プラン</a><a href="stores.html">店舗を探す</a><a href="index.html#syn">系列の特典</a></div>' +
        '<div class="fcol"><h4>ご案内</h4>' +
          '<a href="join.html">WEB入会</a><a href="trial.html">見学・体験</a><a class="cross" href="' + BE_URL + '">運営会社 ' + EXT + '</a></div>' +
      '</div>' +
      '<div class="fbar"><span>© BLUE EARTH JAPAN Co.,Ltd.（プロトタイプ）</span><span>プライバシーポリシー　／　運営会社</span></div>' +
    '</div></footer>';

  /* ---------- 注入 ---------- */
  var headerHTML = (site === 'mb' ? mbHeader : beHeader) + drawer;
  var footerHTML = (site === 'mb' ? mbFooter : beFooter);
  var hSlot = document.getElementById('site-header');
  var fSlot = document.getElementById('site-footer');
  if (hSlot) hSlot.innerHTML = headerHTML; else body.insertAdjacentHTML('afterbegin', headerHTML);
  if (fSlot) fSlot.innerHTML = footerHTML; else body.insertAdjacentHTML('beforeend', footerHTML);
  body.insertAdjacentHTML('beforeend',
    '<div class="proto-ribbon">PROTOTYPE — <b>クリック確認用モック</b>　掲載情報は公式サイト（2026-06-23時点）を基に作成</div>');

  /* ---------- ハンバーガー ---------- */
  var drawerEl = document.getElementById('drawer');
  var hamb = document.querySelector('.hamb');
  function openD() { drawerEl.classList.add('open'); }
  function closeD() { drawerEl.classList.remove('open'); }
  if (hamb) hamb.addEventListener('click', openD);
  if (drawerEl) {
    drawerEl.addEventListener('click', function (e) {
      if (e.target === drawerEl || e.target.classList.contains('x') || e.target.tagName === 'A') closeD();
    });
  }

  /* ---------- 店舗一覧 描画 + 絞り込み ---------- */
  var listEl = document.getElementById('store-list');
  if (listEl && window.STORES) {
    var only = listEl.getAttribute('data-only');
    var onlyMb = only === 'mybody';
    var pool = only === 'mybody' ? window.STORES.filter(function (s) { return s.mybody; })
             : only === 'be'     ? window.STORES.filter(function (s) { return !s.mybody; })
             : window.STORES;
    var detailHref = listEl.getAttribute('data-detail') || 'store.html';

    function card(s) {
      var tags = s.svc.map(function (v) { return '<span class="tg">' + v + '</span>'; }).join('');
      if (s.mybody && !onlyMb) tags += '<span class="tg mb">24h MY-BODY</span>';
      return '<a class="scard" href="' + detailHref + '?id=' + s.id + '">' +
        '<div class="ph" style="background-image:url(assets/img/' + s.img + ')"></div>' +
        '<div class="body"><div class="pref">' + s.pref + '</div>' +
        '<h3>' + s.name + '</h3><div class="addr">' + s.addr + '</div>' +
        '<div class="tags">' + tags + '</div>' +
        '<div class="more">店舗の詳細を見る ›</div></div></a>';
    }
    function render(area) {
      var rows = (area && area !== 'all') ? pool.filter(function (s) { return s.area === area; }) : pool;
      listEl.innerHTML = rows.length
        ? rows.map(card).join('')
        : '<div class="empty">該当する店舗が見つかりませんでした。</div>';
    }
    var tabs = document.querySelectorAll('.area-tabs button');
    function setActive(area) {
      tabs.forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-area') === area); });
    }
    tabs.forEach(function (b) {
      b.addEventListener('click', function () {
        var a = b.getAttribute('data-area');
        setActive(a); render(a);
      });
    });
    var qArea = new URLSearchParams(location.search).get('area');
    var init = qArea || 'all';
    setActive(init); render(init);
  }

  /* ---------- お知らせ 描画 ---------- */
  var newsEl = document.getElementById('news-list');
  if (newsEl && window.NEWS) {
    newsEl.innerHTML = window.NEWS.map(function (n) {
      return '<a href="news.html"><span class="date">' + n.date + '</span>' +
        '<span class="cat-chip">' + n.cat + '</span><span class="t">' + n.t + '</span></a>';
    }).join('');
  }

  /* ---------- 店舗詳細 流し込み ---------- */
  var detailEl = document.getElementById('store-detail');
  if (detailEl && window.STORES) {
    var id = new URLSearchParams(location.search).get('id') || 'kofu';
    var s = window.STORES.filter(function (x) { return x.id === id; })[0] || window.STORES[0];
    var set = function (sel, val) { var n = detailEl.querySelector(sel); if (n) n.textContent = val; };
    var hero = detailEl.querySelector('.detail-hero');
    if (hero) hero.style.backgroundImage = 'url(assets/img/' + s.img + ')';
    set('[data-f="pref"]', s.pref);
    set('[data-f="name"]', s.name);
    set('[data-f="addr"]', s.addr);
    set('[data-f="tel"]', s.tel || '各店舗ページをご確認ください');
    set('[data-f="hours"]', s.hours || '各店舗にお問い合わせください');
    set('[data-f="brand"]', s.mybody ? '24時間ジム MY-BODY' : '総合スポーツクラブ BLUE EARTH');
    var pills = detailEl.querySelector('[data-f="svc"]');
    if (pills) pills.innerHTML = (s.mybody ? '<span style="background:#FFF1DC;color:#b9772e">24時間営業</span>' : '') +
      s.svc.map(function (v) { return '<span>' + v + '</span>'; }).join('');
    set('[data-f="svc2"]', s.svc.join('・'));
    var ttl = document.querySelector('title');
    if (ttl) ttl.textContent = s.name + '｜総合スポーツクラブ BLUE EARTH';
  }

  /* ---------- フォーム送信モック ---------- */
  document.querySelectorAll('form.mock-form').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var card = f.closest('.fcard') || f;
      var thanks = document.getElementById(f.getAttribute('data-thanks') || 'thanks');
      if (thanks) { card.classList.add('hidden'); thanks.classList.remove('hidden'); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    });
  });

  /* ---------- WEB入会 ステップフォーム ---------- */
  var join = document.getElementById('join-form');
  if (join) {
    var stepEls = join.querySelectorAll('[data-step]');
    var bars = document.querySelectorAll('.steps-bar .sb');
    var cur = 1, max = stepEls.length;
    function show(n) {
      cur = n;
      stepEls.forEach(function (el) { el.classList.toggle('hidden', el.getAttribute('data-step') !== String(n)); });
      bars.forEach(function (b) { b.classList.toggle('on', Number(b.getAttribute('data-n')) <= n); });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    join.addEventListener('click', function (e) {
      var t = e.target;
      if (t.matches('[data-next]')) { e.preventDefault(); if (cur < max) show(cur + 1); }
      if (t.matches('[data-prev]')) { e.preventDefault(); if (cur > 1) show(cur - 1); }
    });
    join.addEventListener('submit', function (e) {
      e.preventDefault();
      join.classList.add('hidden');
      var th = document.getElementById('join-thanks');
      if (th) th.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    show(1);
  }
})();
