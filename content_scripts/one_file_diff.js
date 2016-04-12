EnhancedPullRequest.load(function () {
  // See the diff of one file in a window (as opposed to diffs of all files)

  const diffLinks = $('.toc-select .select-menu-item-text').map(function () {
    const fileName = $('.description', this).text().trim();
    const url = new URL(location);
    const params = new URLSearchParams();
    params.set('eprFocus', fileName);
    url.search = '?' + params.toString();

    const link = $('<a class="epr epr-one-file-diff"/>')
      .attr({href: url}).text(fileName);
    return $('<div class="epr"/>').append(link)[0];
  }).hide().insertAfter('.pr-toolbar.js-sticky');

  const oneFileDiffBtn = $('<button type="button" id="one-file-diff-btn"/>')
    .addClass('epr btn-link muted-link select-menu-button')
    .html('<strong>One-File Diff</strong> ')
    .click(() => diffLinks.slideToggle(100));
  $('<div class="epr diffbar-item"/>')
    .append(oneFileDiffBtn)
    .prependTo('.diffbar');

  const file = new URLSearchParams(location.search.slice(1)).get('eprFocus');
  if (!file) return;
  const fileHeader = $('div[data-path="' + escape(file) + '"]')[0];
  if (!fileHeader) return;

  const pathComponents = location.pathname.split('/');
  document.title = file + ' - ' + pathComponents[1] + '/' + pathComponents[2] +
    ' #' + pathComponents[4];

  $('.file.js-details-container').each(function () {
    if (!$.contains(this, fileHeader)) {
      this.style.display = 'none';
    }
  });
});