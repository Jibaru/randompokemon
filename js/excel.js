export class ExcelGenerator {
  /**
   * @param {Pokemon[]} pokemons
   */
  generate(pokemons) {
    const data = pokemons.map((pokemon) => pokemon.toMap());
    const ws = XLSX.utils.json_to_sheet(data);

    // Adjust column widths
    const columnWidths = data.reduce((widths, row) => {
      Object.values(row).forEach((val, index) => {
        const length = String(val).length;
        if (!widths[index] || length > widths[index]) {
          widths[index] = length;
        }
      });
      return widths;
    }, []);
    ws["!cols"] = columnWidths.map((w) => ({ wch: w + 2 }));

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Pokemon List");
    XLSX.writeFile(wb, "pokemon_list.xlsx");
  }
}
