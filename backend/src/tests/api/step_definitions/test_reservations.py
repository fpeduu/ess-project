from src.schemas.response import HTTPResponses, HttpResponseModel
from pytest_bdd import parsers, given, when, then, scenario
from src.service.impl.reservation_service import ReservationService

""" Scenario: Obter todas as reservas """

@scenario(scenario_name='Obter todas as reservas', feature_name='../features/reservations.feature')
def test_get_all_reservations():
    """ Get all reservations """

@given(parsers.cfparse('o ReservationService retorna uma lista de reservas'))
def mock_reservation_service_response():
    """
    Mock the ReservationService.get_all_reservations() method to return a list of reservations
    """

    ReservationService.get_all_reservations = lambda : HttpResponseModel(
        message=HTTPResponses.RESERVATION_FOUND().message,
        status_code=HTTPResponses.RESERVATION_FOUND().status_code,
        data=[{"id": "61c2822b", "room_id": "room1", "user_id": "user1", "start_date": "2022-01-01 10:00:00", "end_date": "2022-01-01 12:00:00"}, {"id": "336ff1c0", "room_id": "room2", "user_id": "user2", "start_date": "2022-01-01 10:00:00", "end_date": "2022-01-02 10:00:00"}]
    )

@when(parsers.cfparse('uma requisição GET for enviada para "{req_url}"'), target_fixture='context')
def send_get_all_reservations_request(client, context, req_url: str):
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

@then(parsers.cfparse('o JSON da resposta deve conter a reserva com id "{reservation_id}", user_id "{user_id}", room_id "{room_id}", start_date "{start_date}" e end_date "{end_date}"'), target_fixture='context')
def check_response_json_contains_reservation_data(context, reservation_id: str, user_id: str, room_id: str, start_date: str, end_date: str):
    """
    Check if the response JSON contains the reservation data
    """

    expected_data = {"id": reservation_id, "room_id": room_id, "user_id": user_id, "start_date": start_date, "end_date": end_date}
    assert expected_data in context['response'].json()['data']
    return context

""" Scenario: Adicionar uma nova reserva """

@scenario(scenario_name='Adicionar uma nova reserva', feature_name='../features/reservations.feature')

def test_create_reservation():
    """ Create a new reservation """

@given(parsers.cfparse('o ReservationService permite a criação de uma reserva'))
def mock_reservation_service_create_method():
    """
    Mock the ReservationService.create_reservation() method to return a list of reservations
    """

    ReservationService.create_reservation = lambda reservation : HttpResponseModel(
        message=HTTPResponses.RESERVATION_CREATED().message,
        status_code=HTTPResponses.RESERVATION_CREATED().status_code,
        data=[{"id": "61c2822b", "room_id": "room1", "user_id": "user1", "start_date": "2022-01-01 10:00:00", "end_date": "2022-01-01 12:00:00"}, {"id": "336ff1c0", "room_id": "room2", "user_id": "user2", "start_date": "2022-01-01 10:00:00", "end_date": "2022-01-02 10:00:00"}]
    )

@when(parsers.cfparse('uma requisição POST for enviada para "{req_url}" com os dados da reserva: user_id "{user_id}", room_id "{room_id}", start_date "{start_date}" e end_date "{end_date}"'), target_fixture='context')
def send_create_reservation_request(client, context, req_url: str, user_id: str, room_id: str, start_date: str, end_date: str):
    """
    Send a POST request to the given URL with the reservation data
    """

    response = client.post(req_url, json={"user_id": user_id, "room_id": room_id, "start_date": start_date, "end_date": end_date})
    context['response'] = response
    return context

@then(parsers.cfparse('o status da resposta deve ser "{status_code}"'), target_fixture='context')
def check_response_status_code(context, status_code: str):
    """
    Check if the response status code is the expected
    """

    assert context['response'].status_code == int(status_code)
    return context

@then(parsers.cfparse('o JSON da resposta deve conter a reserva com user_id "{user_id}", room_id "{room_id}", start_date "{start_date}" e end_date "{end_date}"'), target_fixture='context')
def check_response_json_contains_reservation_data(context, user_id: str, room_id: str, start_date: str, end_date: str):
    """
    Check if the response JSON contains the reservation data
    """

    expected_data = {"room_id": room_id, "user_id": user_id, "start_date": start_date, "end_date": end_date}
    response_data = context['response'].json()['data']

    sanitized_response_data = [{k: v for k, v in reservation.items() if k != 'id'} for reservation in response_data]

    assert expected_data in sanitized_response_data
    return context

""" Scenario: Atualizar uma reserva existente """

@scenario(scenario_name='Atualizar uma reserva existente', feature_name='../features/reservations.feature')

def test_update_reservation():
    """ Update an existing reservation """

@given(parsers.cfparse('o ReservationService permite a atualização de uma reserva'))
def mock_reservation_service_update_method():
    """
    Mock the ReservationService.update_reservation() method to return a list of reservations
    """

    ReservationService.update_reservation = lambda reservation_id, reservation : HttpResponseModel(
        message=HTTPResponses.RESERVATION_UPDATED().message,
        status_code=HTTPResponses.RESERVATION_UPDATED().status_code,
        data=[{"id": "61c2822b", "room_id": "room1", "user_id": "user1", "start_date": "2022-01-01 10:00:00", "end_date": "2022-01-01 12:00:00"}, {"id": "336ff1c0", "room_id": "room2", "user_id": "user2", "start_date": "2022-01-01 10:00:00", "end_date": "2022-01-02 10:00:00"}]
    )

@given(parsers.cfparse('a reserva com id "{reservation_id}" existe'), target_fixture='context')
def mock_reservation_exists(context, reservation_id: str):
    """
    Mock the database to return a reservation with the given ID
    """

    ReservationService.update_reservation = lambda reservation_id, reservation : HttpResponseModel(
        message=HTTPResponses.RESERVATION_UPDATED().message,
        status_code=HTTPResponses.RESERVATION_UPDATED().status_code,
        data=[{"id": reservation_id, "room_id": "room1", "user_id": "user1", "start_date": "2022-01-02 10:00:00", "end_date": "2022-01-02 12:00:00"}, {"id": "336ff1c0", "room_id": "room2", "user_id": "user2", "start_date": "2022-01-01 10:00:00", "end_date": "2022-01-02 10:00:00"}]
    )

@when(parsers.cfparse('uma requisição PUT for enviada para "{req_url}" com os dados da reserva: user_id "{user_id}", room_id "{room_id}", start_date "{start_date}" e end_date "{end_date}"'), target_fixture='context')
def send_update_reservation_request(client, context, req_url: str, user_id: str, room_id: str, start_date: str, end_date: str):
    """
    Send a PUT request to the given URL with the reservation data
    """

    response = client.put(req_url, json={"user_id": user_id, "room_id": room_id, "start_date": start_date, "end_date": end_date})
    context['response'] = response
    return context

@then(parsers.cfparse('o status da resposta será "{status_code}"'), target_fixture='context')
def check_response_status_code(context, status_code: str):
    """
    Check if the response status code is the expected
    """

    assert context['response'].status_code == int(status_code)
    return context

@then(parsers.cfparse('o JSON da resposta deve conter a reserva atualizada com id "{id}", user_id "{user_id}", room_id "{room_id}", start_date "{start_date}" e end_date "{end_date}"'))
def check_response_json_contains_reservation_data(context, id: str ,user_id: str, room_id: str, start_date: str, end_date: str):
    """
    Check if the response JSON contains the reservation data
    """

    expected_data = {"id": id, "room_id": room_id, "user_id": user_id, "start_date": start_date, "end_date": end_date}
    assert expected_data in context['response'].json()['data']
    return context