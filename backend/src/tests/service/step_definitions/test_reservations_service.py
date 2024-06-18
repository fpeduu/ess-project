from src.schemas.response import HTTPResponses, HttpResponseModel
from pytest_bdd import parsers, given, when, then, scenario
from src.service.impl.reservation_service import ReservationService

""" Scenario: Get all reservations """
@scenario(scenario_name='Buscar todas as reservas', feature_name='../features/reservations-service.feature')
def test_get_all_reservations():
    """ Get all reservations """

@given(parsers.cfparse('o método getAllReservations do ReservationService retorna um array com a reserva de id "{reservation_id}"'))
def mock_reservation_service_response(reservation_id: str):
    """
    Mock the ReservationService.getAllReservations() method to return a list of reservations
    """

    ReservationService.get_all_reservations = lambda : HttpResponseModel(
        message=HTTPResponses.RESERVATION_FOUND().message,
        status_code=HTTPResponses.RESERVATION_FOUND().status_code,
        data=[{"id": reservation_id, "room_id": "room1", "user_id": "user1", "start_date": "2022-01-01 10:00:00", "end_date": "2022-01-01 12:00:00"}]
    )

@when(parsers.cfparse('o método getAllReservations do ReservationService for chamado'), target_fixture='context')
def call_get_all_reservations_method(context):
    """
    Call the getAllReservations method from ReservationService
    """

    response = ReservationService.get_all_reservations()
    context['response'] = response
    return context

@then(parsers.cfparse('o array retornado deve conter a reserva de id "{reservation_id}"'), target_fixture='context')
def check_response_json_contains_reservation_data(context, reservation_id: str):
    """
    Check if the response JSON contains the reservation data
    """

    expected_data = {"id": reservation_id, "room_id": "room1", "user_id": "user1", "start_date": "2022-01-01 10:00:00", "end_date": "2022-01-01 12:00:00"}
    assert expected_data in context['response'].data
    return context

""" Scenario: Create a new reservation """

@scenario(scenario_name='Adicionar uma reserva', feature_name='../features/reservations-service.feature')
def test_create_reservation():
    """ Create a new reservation """

@given(parsers.cfparse('o método createReservation do ReservationService adiciona uma reserva com id "{reservation_id}" e a retorna num array'))
def mock_reservation_service_response(reservation_id: str):
    """
    Mock the ReservationService.createReservation() method to return a list of reservations
    """

    ReservationService.create_reservation = lambda room_id, user_id, start_date, end_date: HttpResponseModel(
        message=HTTPResponses.RESERVATION_CREATED().message,
        status_code=HTTPResponses.RESERVATION_CREATED().status_code,
        data=[{"id": reservation_id, "room_id": room_id, "user_id": user_id, "start_date": start_date, "end_date": end_date}]
    )

@when(parsers.cfparse('o método createReservation do ReservationService for chamado com os parâmetros start_date "{start_date}", end_date "{end_date}", room_id "{room_id}" e user_id "{user_id}"'), target_fixture='context')
def call_create_reservation_method(context, start_date: str, end_date: str, room_id: str, user_id: str):
    """
    Call the createReservation method from ReservationService
    """

    response = ReservationService.create_reservation(room_id, user_id, start_date, end_date)
    context['response'] = response
    return context

@then(parsers.cfparse('o array retornado deve conter a reserva de id "{reservation_id}", start_date "{start_date}", end_date "{end_date}", room_id "{room_id}" e user_id "{user_id}"'), target_fixture='context')
def check_response_json_contains_reservation_data(context, reservation_id: str, start_date: str, end_date: str, room_id: str, user_id: str):
    """
    Check if the response JSON contains the reservation data
    """

    expected_data = {"id": reservation_id, "room_id": room_id, "user_id": user_id, "start_date": start_date, "end_date": end_date}
    assert expected_data in context['response'].data
    return context

""" Scenario: Update a reservation """

@scenario(scenario_name='Atualizar uma reserva', feature_name='../features/reservations-service.feature')
def test_update_reservation():
    """ Update a reservation """

@given(parsers.cfparse('o método updateReservation do ReservationService atualiza a reserva de id "{reservation_id}" e a retorna num array'))
def mock_reservation_service_response(reservation_id: str):
    """
    Mock the ReservationService.updateReservation() method to return a list of reservations
    """

    ReservationService.update_reservation = lambda reservation_id, room_id, user_id, start_date, end_date: HttpResponseModel(
        message=HTTPResponses.RESERVATION_UPDATED().message,
        status_code=HTTPResponses.RESERVATION_UPDATED().status_code,
        data=[{"id": reservation_id, "room_id": room_id, "user_id": user_id, "start_date": start_date, "end_date": end_date}]
    )

@when(parsers.cfparse('o método updateReservation do ReservationService for chamado com os parâmetros id "{reservation_id}", start_date "{start_date}", end_date "{end_date}", room_id "{room_id}" e user_id "{user_id}"'), target_fixture='context')
def call_update_reservation_method(context, reservation_id: str, start_date: str, end_date: str, room_id: str, user_id: str):
    """
    Call the updateReservation method from ReservationService
    """

    response = ReservationService.update_reservation(reservation_id, room_id, user_id, start_date, end_date)
    context['response'] = response
    return context


@then(parsers.cfparse('a reserva de id "{reservation_id}", com os parâmetros start_date "{start_date}", end_date "{end_date}", room_id "{room_id}" e user_id "{user_id}" deve ser estar no array retornado'), target_fixture='context')
def check_response_json_contains_reservation_data(context, reservation_id: str, start_date: str, end_date: str, room_id: str, user_id: str):
    """
    Check if the response JSON contains the reservation data
    """

    expected_data = {"id": reservation_id, "room_id": room_id, "user_id": user_id, "start_date": start_date, "end_date": end_date}
    assert expected_data in context['response'].data
    return context



"""Scenario: Approve a reservation"""

@scenario(scenario_name='Aprovar uma reserva', feature_name='../features/reservations-service.feature')
def test_approve_reservation():
    """ Approves a reservation """

@given(parsers.cfparse('o método approve_reservation do reservation_service atualiza o status da reserva de id {reservation_id}'))
def mock_reservation_service_response(reservation_id: str):
    """
    Mock the ReservationService.updateReservation() method to return a list of reservations
    """
    
    ReservationService.approve_reservation = lambda reservation_id: HttpResponseModel(
        message=HTTPResponses.RESERVATION_APPROVED().message,
        status_code=HTTPResponses.RESERVATION_APPROVED().status_code,
        data={"status": "approved"}
    )

@when(parsers.cfparse('o método approve_reservation do reservation_service for chamado com os parâmetros id {reservation_id}'), target_fixture='context')
def call_approve_reservation_method(context, reservation_id: str):
    """
    Call the updateReservation method from ReservationService
    """
    
    response = ReservationService.approve_reservation(reservation_id)
    context['response'] = response
    return context

@then(parsers.cfparse('a reserva de id {reservation_id} deve ser seu status atualizado para "approved"'), target_fixture='context')
def check_response_json_approves_reservation(context, reservation_id: str):
    """
    Check if the response JSON contains the reservation data
    """
    
    expected_data = 'approved'
    assert expected_data in context['response'].data['status']
    return context



"""Scenario: Deny a reservation"""

@scenario(scenario_name='Negar uma reserva', feature_name='../features/reservations-service.feature')
def test_deny_reservation():
    """ Denies a reservation """

@given(parsers.cfparse('o método deny_reservation do reservation_service atualiza o status da reserva de id {reservation_id}'))
def mock_reservation_service_response(reservation_id: str):
    """
    Mock the ReservationService.updateReservation() method to return a list of reservations
    """
    
    ReservationService.deny_reservation = lambda reservation_id: HttpResponseModel(
        message=HTTPResponses.RESERVATION_DENIED().message,
        status_code=HTTPResponses.RESERVATION_DENIED().status_code,
        data={"status": "denied"}
    )

@when(parsers.cfparse('o método deny_reservation do reservation_service for chamado com os parâmetros id {reservation_id}'), target_fixture='context')
def call_deny_reservation_method(context, reservation_id: str):
    """
    Call the updateReservation method from ReservationService
    """
    
    response = ReservationService.deny_reservation(reservation_id)
    context['response'] = response
    return context

@then(parsers.cfparse('a reserva de id {reservation_id} deve ser seu status atualizado para "denied"'), target_fixture='context')
def check_response_json_denies_reservation(context, reservation_id: str):
    """
    Check if the response JSON contains the reservation data
    """
    
    expected_data = 'denied'
    assert expected_data in context['response'].data['status']
    return context