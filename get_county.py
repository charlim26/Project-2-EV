url = 'https://www.zipcodestogo.com/Washington/'  
tables = pd.read_html(url)
table = tables[1]
table.columns = table.iloc[1,:]
table = table.iloc[2:,:]
table = table[['Zip Code', 'County']]
def get_county(z):
    return table.loc[table['Zip Code'] == str(z), 'County'].values[0]