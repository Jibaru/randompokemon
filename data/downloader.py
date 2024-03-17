import requests

url = 'https://www.smogon.com/dex/_rpc/dump-format'

payload = {
    "gen": "sv",
    "alias": None,
    "language": "en"
}

headers = {
    "Content-Type": "application/json"
}

for tier in ['uber', 'ou', 'uu', 'ru', 'nu', 'pu']:
    payload['alias'] = tier

    response = requests.post(url, json=payload, headers=headers)

    with open(f"data/{tier}.json", 'w') as f:
        f.write(response.text)

print('Data fetched and saved to data/"format".json')
