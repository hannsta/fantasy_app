import requests
from .models import Player, PlayerStat, StatDefinition
from django.db.models import Max
from django.db import transaction

class NFLFantasyService(object):
    @transaction.atomic
    def getStatDefinitions(self):
        r = requests.get('http://api.fantasy.nfl.com/v1/game/stats?format=json')
        jsondata = r.json()
        stats = jsondata['stats']
        definitions=[]
        for stat in stats:
            definition = StatDefinition(
                stat_id = stat['id'],
                stat_name = stat['shortName'])  
            print(definition)
            definitions.append(definition)
        StatDefinition.objects.bulk_create(definitions)
        return "Success!" 

    @transaction.atomic
    def getWeekStats(self, season, week):
        r = requests.get('https://api.fantasy.nfl.com/v1/players/stats?statType=weekStats&season=%d&week=%d&format=json' % (season,week))
        jsondata = r.json()
        players = jsondata['players']
        player_stat_id = Player.objects.aggregate(Max('player_stat_id'))['player_stat_id__max']
        if player_stat_id == None:
            player_stat_id = 1

        stat_data=[]
        player_data=[]
        for player in players:
            player_row = Player(player_id = player['id'], 
                                name = player['name'],
                                position = player['position'],
                                team = player['teamAbbr'], 
                                week = week, 
                                player_stat_id =  player_stat_id)
            player_data.append(player_row)
            for stat_id, stat_value in player['stats'].items():
                stat_row = PlayerStat(player_stat_id = player_stat_id, 
                                    stat_id = stat_id,
                                    points = stat_value)
                stat_data.append(stat_row)
            player_stat_id+=1
        Player.objects.bulk_create(player_data)
        PlayerStat.objects.bulk_create(stat_data)
        return "Success!"