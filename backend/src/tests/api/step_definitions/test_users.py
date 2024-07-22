from src.schemas.response import HTTPResponses, HttpResponseModel
from pytest_bdd import parsers, given, when, then, scenario
from src.service.impl.user_service import UserService
from unittest.mock import patch
import pytest
from datetime import datetime

""" Scenario: Adicionar um novo usuário """

@scenario(scenario_name='Adicionar um novo usuário', feature_name='../features/users.feature')
def test_create_user():
    """ Create a new user """

@given(parsers.cfparse('o UserService permite a criação de um usuário'))
def mock_user_service_create_user_method():
    """Mock the UserService.create_user() method to create a new user"""
    with patch('src.service.impl.user_service.UserService.create_user', return_value=HttpResponseModel(
        message=HTTPResponses.USER_CREATED().message,
        status_code=HTTPResponses.USER_CREATED().status_code,
        data={"id" :"user2", "email": "jane.doe@example.com", "password" :"password123", "cpf" :"123", "name": "Jane Doe" , "role": "user"}
    )):
        yield

@when(parsers.cfparse('uma requisição POST for enviada para "{req_url}" com os dados do usuário: email "{email}", password "{password}", cpf "{cpf}", name "{name}", role "{role}"'), target_fixture='context')
def send_create_user_request(client, context, req_url: str, email: str, password: str, cpf: str, name: str, role: str):
    """Send a POST request to the given URL with the user data"""
    response = client.post(req_url, json={"email": email, "password": password, "cpf": cpf, "name": name, "role": role})
    context['response'] = response
    return context

@then(parsers.cfparse('o status da resposta deve ser "{status_code}"'), target_fixture='context')
def check_response_status_code(context, status_code: str):
    """Check if the response status code is the expected"""
    assert context['response'].status_code == int(status_code)
    return context

@then(parsers.cfparse('o JSON da resposta deve conter o usuário com id "{id}", name "{name}", email "{email}" e role "{role}"'))
def check_response_json_contains_user_data(context, id: str, name: str, email: str, role: str):
    """Check if the response JSON contains the user data"""
    expected_data = {"id": id, "name": name, "email": email, "role": role}
    response_data = context['response'].json()['data']
    for key, value in expected_data.items():
        assert response_data[key] == value
    return context