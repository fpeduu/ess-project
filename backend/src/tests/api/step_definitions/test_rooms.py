from src.schemas.response import HTTPResponses, HttpResponseModel
from pytest_bdd import parsers, given, when, then, scenario
from src.service.impl.room_service import RoomService

""" Scenario: obter uma sala"""
@scenario(scenario_name='Obter uma sala', feature_name='../features/rooms.feature')

def test_get_room():
      """ Get one specific room """

@given(parsers.cfparse('o RoomService retorna uma sala'))
def mock_room_service_response():
      """
            Mock the RoomService.get_rooms() method to return room data
      """
      RoomService.get_room = lambda id : HttpResponseModel(
            message=HTTPResponses.ROOM_FOUND().message,
            status_code=HTTPResponses.ROOM_FOUND().status_code,
            data=[{"id": "3cfe9043", "name": "Sala A22", "status": "false", "occupancy": "40"}]
      )

@when(parsers.cfparse('uma requisição GET for enviada para "{req_url}"'),target_fixture='context')
def send_get_room_request(client, context, req_url: str):
      """
            Send a GET request to the given URL
      """
      response = client.get(req_url)
      context['response'] = response
      return context

@then(parsers.cfparse('o status da resposta deve ser "{status_code}"'), target_fixture='context')
def check_get_room_response_status_code(context, status_code: str):
      """
            Check if the response status code is as expected
      """

      assert context['response'].status_code == int(status_code)
      return context

@then(parsers.cfparse('o JSON da resposta deve conter a sala com id "{id}", name "{name}", status "{status}", occupancy "{occupancy}"'), target_fixture='context')
def check_get_room_response_json_contains_room_data(context, id: str, name: str, status: bool, occupancy: str):
      """
            Check if the response JSON contains the room data
      """      

      expected_data = {"id": id, "name": name, "status": status, "occupancy": occupancy}
      assert expected_data in context['response'].json()['data']
      return context



""" Scenario: Obter todas as salas """

@scenario(scenario_name='Obter todas as salas', feature_name='../features/rooms.feature')
def test_get_all_rooms():
      """ Get all rooms """

@given(parsers.cfparse('o RoomService retorna uma lista de salas'))
def mock_room_service_response():
      """
            Mock the RoomService.get_all_rooms() method to return a list of rooms
      """

      RoomService.get_all_rooms = lambda : HttpResponseModel (
            message=HTTPResponses.ROOM_FOUND().message,
            status_code=HTTPResponses.ROOM_FOUND().status_code,
            data=[{"id": "cde84eee"},{"id": "00251726","name": "Sala A22","status": "disponível","occupancy": 40,"created_at": "2024-06-16T19:48:51.896Z"},{"id": "3cfe9043","name": "Sala A22","status": "true","occupancy": 40},{"status": "false","id": "88369ad5"}]
      )

@when(parsers.cfparse('uma requisição GET for enviada para "{req_url}"'), target_fixture='context')
def send_get_all_rooms_request(client, context, req_url: str):
      """
            Send a GET request to the given URL
      """

      response = client.get(req_url)
      context['response'] = response
      return context

@then(parsers.cfparse('o status da resposta deve ser "{status_code}"'), target_fixture='context')
def check_response_status_code(context, status_code: str):
      """
            Check if the response status code is the expected
      """

      assert context['response'].status_code == int(status_code)
      return context

@then(parsers.cfparse('o JSON da resposta deve conter a sala com id "{id}", name "{name}", status "{status}", occupancy "{occupancy}"'), target_fixture='context')
def check_get_response_json_contains_room_data(context, id: str, name: str, status: str, occupancy: str):
      """
            Check if the response JSON contains the room data
      """
      expected_data = {"id": id, "name": name, "status": status, "occupancy": int(occupancy)}
      assert expected_data in context['response'].json()['data']
      return context

""" Scenario: adicionar uma nova sala """

@scenario(scenario_name='Adicionar uma nova sala', feature_name='../features/rooms.feature')

def test_create_room():
      """ Create a new room """

@given(parsers.cfparse('o RoomService permite a criação de uma sala'))
def mock_room_service_create_method():
      """
            Mock the RoomService.create_room() method to return a list of rooms
      """

      RoomService.create_room = lambda room : HttpResponseModel(
            message=HTTPResponses.ROOM_CREATED().message,
            status_code=HTTPResponses.ROOM_CREATED().status_code,
            data=[{"id": "3cfe9043", "name": "Sala A22", "status": "true", "occupancy": 40}, {"id": "er5311", "name": "Sala A55", "status": "true", "occupancy": 65}]
      )

@when(parsers.cfparse('uma requisição POST for enviada para "{req_url}" com os dados da sala: id "{id}", name "{name}", status "{status}", occupancy "{occupancy}"'), target_fixture='context')
def send_create_room_request(client, context, req_url : str, id: str, name: str, status: str, occupancy: str):
      """
            Send a POST request to the given URL with the room data
      """
      response = client.post(req_url, json={"id": id, "name": name, "status": status, "occupancy": int(occupancy)})
      context['response'] = response
      return context

@then(parsers.cfparse('o status da resposta deve ser "{status_code}"'), target_fixture='context')
def check_response_status_code(context, status_code:str):
      """
            Check if the response status code is as expected
      """

      assert context['response'].status_code == int(status_code)
      return context

@then(parsers.cfparse('o JSON da reposta deve conter a sala com id "{id}", name "{name}", status "{status}", occupancy "{occupancy}"'), target_fixture='context')
def check_post_response_json_contains_room_data(context, id: str, name: str, status: str, occupancy: str):
      """
            Check if the response JSON contains the room data
      """
      expected_data = {"id": id, "name": name, "status": status, "occupancy": occupancy}
      response_data = context['response'].json()['data']
      clean_response_data = [{k: (v) for k, v in room.items() if k != 'id'} for room in response_data]  # Remove int() conversion
      assert expected_data in clean_response_data
      return context

@scenario(scenario_name='Atualizar status de uma sala', feature_name='../features/rooms.feature')

def test_update_room_status():
      """ Update the status of a room """

@given(parsers.cfparse('o RoomService permite a atualização do status de uma sala'))
def mock_room_service_update_method():
      """
            Mock the RoomService.update_room_status() method to return status code as expected
      """

      RoomService.update_room_status = lambda id, status : HttpResponseModel(
            message=HTTPResponses.ROOM_CHANGE_STATUS().message,
            status_code=HTTPResponses.ROOM_CHANGE_STATUS().status_code,
            data=[{
                  "id": "3cfe9043",
                  "name": "Sala A22",
                  "status": "false",
                  "occupancy": 40
            }]
      )

@given(parsers.cfparse('a sala com id "{id}" existe'), target_fixture='context')
def mock_room_exists(context, id: str):
      """
            Mock the database to return a room with the given ID
      """
      RoomService.update_room_status = lambda id, status : HttpResponseModel(
            message=HTTPResponses.ROOM_CHANGE_STATUS().message,
            status_code=HTTPResponses.ROOM_CHANGE_STATUS().status_code,
            data=[{"id": id, "name": "Sala A22", "status": status, "occupancy": "40"}]
      )

@when(parsers.cfparse('uma requisição PUT for enviada para "{req_url}" com os dados da sala com id "{id}", name "{name}", status "{status}", occupancy "{occupancy}"'), target_fixture='context')
def send_update_room_status_request(client, context, req_url: str, id: str, name: str, status: str, occupancy: str):
      """
            Send a PUT request to the given URL with the room data
      """

      response = client.put(req_url, json={"id": id, "name": name, "status": status, "occupancy": int(occupancy)})
      context['response'] = response
      return context

@then(parsers.cfparse('o status da resposta deve ser "{status_code}"'), target_fixture='context')
def check_update_room_response_status_code(context, status_code: str):
      """
            Check if the response status code is as expected
      """
      assert context['response'].status_code == int(status_code)
      return context

@then(parsers.cfparse('o JSON da resposta deve conter o status atualizado da sala com id "{id}", name "{name}", status "{status}", occupancy "{occupancy}"'), target_fixture='context')
def check_update_room_response_json(context, id: str, name: str, status: str, occupancy: str):
      """
            Check if the response JSON contains the room data
      """
      converted_status = status.lower() == 'true'

      expected_data = {"id": id, "name": name, "status": converted_status, "occupancy": occupancy}
      assert expected_data in context['response'].json()['data']
      return context

@scenario(scenario_name='Remover uma sala', feature_name='../features/rooms.feature')

def test_delete_room():
      """ Delete a room """

@given(parsers.cfparse('o RoomService retorna uma sala'))
def mock_room_service_response():
      """
            Mock the RoomService.delete_room() method to return the room data
      """

      RoomService.delete_room = lambda id : HttpResponseModel (
            message=HTTPResponses.ROOM_DELETED().message,
            status_code=HTTPResponses.ROOM_DELETED().status_code,
            data=[{"id": "3cfe9043", "name": "Sala A22", "status": "false", "occupancy": "40"}]
      )

@when(parsers.cfparse('uma requisição DELETE for enviada para "{req_url}" com os dados da sala: id "{id}"'), target_fixture='context')
def send_delete_room_request(client, context, req_url: str, id: str):
      """
            Send a DELETE request to the given URL
      """
      response = client.delete(req_url)
      context['response'] = response
      return context

@then(parsers.cfparse('o status da resposta deve ser "{status_code}"'), target_fixture='context')
def check_delete_room_response_status_code(context, status_code: str):
      """
            Check if the response status code is as expected
      """
      assert context['response'].status_code == int(status_code)
      return context

@then(parsers.cfparse('o JSON da resposta deve conter a remoção da sala com id "{id}", name "{name}", status "{status}", occupancy "{occupancy}"'), target_fixture='context')
def check_delete_room_response_json(context, id: str, name: str, status: str, occupancy: str):
      """
            Check if the response JSON contains the room data
      """
      expected_data = {"id": id, "name": name, "status": status, "occupancy": occupancy}
      assert expected_data in context['response'].json()['data']
      return context



