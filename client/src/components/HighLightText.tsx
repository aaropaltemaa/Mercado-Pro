function highlightText(text: string, search: string) {
  if (!search) return [text];

  const lowerText = text.toLowerCase();
  const lowerSearch = search.toLowerCase();
  const matchIndex = lowerText.indexOf(lowerSearch);

  if (matchIndex === -1) return [text];

  const before = text.slice(0, matchIndex);
  const match = text.slice(matchIndex, matchIndex + search.length);
  const after = text.slice(matchIndex + search.length);

  return [
    before,
    <span key="highlight" className="bg-yellow-200 font-bold rounded px-1">
      {match}
    </span>,
    after,
  ];
}

export default highlightText;
