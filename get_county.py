url = 'https://www.zipcodestogo.com/Washington/'  
tables = pd.read_html(url)
table = tables[1]
table.columns = table.iloc[1,:]
table = table.iloc[2:,:]
table = table[['Zip Code', 'County']]
def get_county(z):
	a = table.loc[table['Zip Code'] == str(z), 'County'].values
	if len(a) > 0:
		return a[0]
	else:
		return "Unknown"