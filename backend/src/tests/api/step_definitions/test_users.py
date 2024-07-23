from src.schemas.response import HTTPResponses, HttpResponseModel
from pytest_bdd import parsers, given, when, then, scenario
from src.service.impl.user_service import UserService
from unittest.mock import patch
import pytest
from datetime import datetime


@scenario(scenario_name='Adicionar um novo usuário', feature_name='../features/users.feature')
def test_create_user():
    """ Create a new user """

@given('o UserService permite a criação de um usuário')
def mock_user_service_create_method():
    """
    Mock the UserService.create_user() method to return a list of users
    """
    UserService.create_user = lambda user: HttpResponseModel(
        message="User successfully created.",
        status_code=201,
        data=[
            {
                "email": "jane.doe@example.com",
                "password": "password123",
                "cpf": "123",
                "name": "Jane Doe",
                "role": "user"
            }
        ]
    )

@when(parsers.parse('uma requisição POST for enviada para "{req_url}" com os dados do usuário: email "{email}", password "{password}", cpf "{cpf}", name "{name}", role "{role}"'), target_fixture='context')
def send_create_user_request(client, context, req_url: str, email: str, password: str, cpf: str, name: str, role: str):
    """
    Send a POST request to the given URL with the user data
    """
    response = client.post(req_url, json={"email": email, "password": password, "cpf": cpf, "name": name, "role": role})
    context['response'] = response
    return context

@then(parsers.parse('o status da resposta deve ser "{status_code}"'))
def check_response_status_code(context, status_code: str):
    """
    Check if the response status code is the expected
    """
    assert context['response'].status_code == int(status_code)

@then(parsers.parse('o JSON da resposta deve conter o usuário com email "{email}", password "{password}", cpf "{cpf}", name "{name}", role "{role}"'))
def check_response_json_contains_user_data(context, email: str, password: str, cpf: str, name: str, role: str):
    """
    Check if the response JSON contains the user data
    """
    expected_data = {"email": email, "password": password, "cpf": cpf, "name": name, "role": role}
    response_data = context['response'].json()['data']

    assert expected_data in response_data




@scenario(scenario_name='Deletar um usuário existente', feature_name='../features/users.feature')
def test_delete_user():
    """ Delete an existing user """

@given('o UserService permite a criação de um usuário')
def mock_user_service_create_method():
    """
    Mock the UserService.create_user() method to return a list of users
    """
    UserService.create_user = lambda user: HttpResponseModel(
        message="User successfully created.",
        status_code=201,
        data=[
            {
                "email": "jane.doe@example.com",
                "password": "password123",
                "cpf": "123",
                "name": "Jane Doe",
                "role": "user"
            }
        ]
    )

@given('o UserService permite a exclusão de um usuário')
def mock_user_service_delete_method():
    """
    Mock the UserService.delete_user() method to return a success message
    """
    UserService.delete_user = lambda user_id: HttpResponseModel(
        message="Usuário deletado com sucesso",
        status_code=200,
        data=[]
    )

@given(parsers.cfparse('o usuário com id "{user_id}" existe'))
def ensure_user_exists(user_id: str):
    """
    Ensure the user with the given id exists
    """
    # Aqui você pode mockar ou configurar o estado inicial do seu banco de dados ou serviço
    pass

@when(parsers.parse('uma requisição DELETE for enviada para "{req_url}"'), target_fixture='context')
def send_delete_user_request(client, context, req_url: str):
    """
    Send a DELETE request to the given URL
    """
    response = client.delete(req_url)
    context['response'] = response
    return context

@then(parsers.parse('o status da resposta deve ser "{status_code}"'))
def check_response_status_code(context, status_code: str):
    """
    Check if the response status code is the expected
    """
    assert context['response'].status_code == int(status_code)

@then(parsers.parse('o JSON da resposta deve conter a mensagem "{message}"'))
def check_response_json_contains_message(context, message: str):
    """
    Check if the response JSON contains the expected message
    """
    response_message = context['response'].json()['message']
    assert response_message == message





@scenario(scenario_name='Obter todos os usuários', feature_name='../features/users.feature')
def test_get_all_users():
    """ Get all users """

@given('o UserService permite a criação de um usuário')
def mock_user_service_create_method():
    """
    Mock the UserService.create_user() method to return a list of users
    """
    UserService.create_user = lambda user: HttpResponseModel(
        message="User successfully created.",
        status_code=201,
        data=[
            {
                "email": "jane.doe@example.com",
                "password": "password123",
                "cpf": "123",
                "name": "Jane Doe",
                "role": "user"
            }
        ]
    )

@given('o UserService permite a exclusão de um usuário')
def mock_user_service_delete_method():
    """
    Mock the UserService.delete_user() method to return a success message
    """
    UserService.delete_user = lambda user_id: HttpResponseModel(
        message="Usuário deletado com sucesso",
        status_code=200,
        data=[]
    )

@given('o UserService retorna uma lista de usuários')
def mock_user_service_get_all_method():
    """
    Mock the UserService.get_all_users() method to return a list of users
    """
    UserService.get_all_users = lambda: HttpResponseModel(
        message="Users retrieved successfully.",
        status_code=200,
        data=[
            {
                "email": "jane.doe@example.com",
                "password": "password123",
                "cpf": "123",
                "name": "Jane Doe",
                "role": "user"
            }
        ]
    )

@given(parsers.cfparse('o usuário com id "{user_id}" existe'))
def ensure_user_exists(user_id: str):
    """
    Ensure the user with the given id exists
    """
    # Aqui você pode mockar ou configurar o estado inicial do seu banco de dados ou serviço
    pass

@when(parsers.parse('uma requisição DELETE for enviada para "{req_url}"'), target_fixture='context')
def send_delete_user_request(client, context, req_url: str):
    """
    Send a DELETE request to the given URL
    """
    response = client.delete(req_url)
    context['response'] = response
    return context

@when(parsers.parse('uma requisição GET for enviada para "{req_url}"'), target_fixture='context')
def send_get_all_users_request(client, context, req_url: str):
    """
    Send a GET request to the given URL
    """
    response = client.get(req_url)
    context['response'] = response
    return context

@then(parsers.parse('o status da resposta deve ser "{status_code}"'))
def check_response_status_code(context, status_code: str):
    """
    Check if the response status code is the expected
    """
    assert context['response'].status_code == int(status_code)

@then(parsers.parse('o JSON da resposta deve conter a mensagem "{message}"'))
def check_response_json_contains_message(context, message: str):
    """
    Check if the response JSON contains the expected message
    """
    response_message = context['response'].json()['message']
    assert response_message == message

@then(parsers.parse('o JSON da resposta deve conter o usuário com email "{email}", password "{password}", cpf "{cpf}", name "{name}", role "{role}"'))
def check_response_json_contains_user_data(context, email: str, password: str, cpf: str, name: str, role: str):
    """
    Check if the response JSON contains the user data
    """
    expected_data = {"email": email, "password": password, "cpf": cpf, "name": name, "role": role}
    response_data = context['response'].json()['data']

    assert expected_data in response_data





@scenario(scenario_name='Obter usuário por ID', feature_name='../features/users.feature')
def test_get_user_by_id():
    """ Get user by ID """

@given(parsers.cfparse('o UserService retorna um usuário por ID'))
def mock_user_service_response():
    """
    Mock the UserService.get_user() method to return a user by ID
    """
    UserService.get_user = lambda user_id: HttpResponseModel(
        message=HTTPResponses.ITEM_FOUND().message,
        status_code=HTTPResponses.ITEM_FOUND().status_code,
        data={
            "id": "4",
            "email": "john.doe@example.com",
            "password": "password123",
            "cpf": "123",
            "name": "John Doe",
            "role": "admin"
        }
    )

@when(parsers.cfparse('uma requisição GET for enviada para "{req_url}"'), target_fixture='context')
def send_get_user_by_id_request(client, context, req_url: str):
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

@then(parsers.cfparse('o JSON da resposta deve conter o usuário com id "{id}", cpf "{cpf}", name "{name}", email "{email}", role "{role}", password "{password}"'), target_fixture='context')
def check_get_response_json_contains_user_data(context, id: str, cpf: str, name: str, email: str, role: str, password: str):
    """
    Check if the response JSON contains the user data
    """
    expected_data = {
        "id": id,
        "cpf": cpf,
        "name": name,
        "email": email,
        "role": role,
        "password": password
    }
    response_data = context['response'].json()['data']
    assert expected_data == response_data, f"Esperava {expected_data}, mas obteve {response_data}"
    return context






@scenario(scenario_name='Atualizar um usuário existente', feature_name='../features/users.feature')
def test_update_user():
    """ Atualizar um usuário existente """

@given('o UserService permite a atualização de um usuário')
def mock_user_service_update_method():
    """
    Mock the UserService.update_user() method to return the updated user
    """
    UserService.update_user = lambda user_id, user_data: HttpResponseModel(
        message="Usuário atualizado com sucesso",
        status_code=200,
        data={
            "id": user_id,
            **user_data
        }
    )

@given(parsers.cfparse('o usuário com id "{user_id}" existe'))
def ensure_user_exists(user_id: str):
    """
    Ensure the user with the given id exists
    """
    # Simulamos que o usuário existe ao definir o mock acima

@when(parsers.parse('uma requisição PUT for enviada para "{req_url}" com os dados {user_data}'))
def send_update_user_request(req_url: str, user_data: str, context):
    """
    Simulate the request to update the user with the given data
    """
    # Convert the user_data string JSON into a dictionary
    user_data_dict = json.loads(user_data)
    
    # Simula a chamada ao serviço
    response = UserService.update_user(req_url.split('/')[-1], user_data_dict)
    context['response'] = response

@then(parsers.parse('o status da resposta deve ser "{status_code}"'))
def check_response_status_code(context, status_code: str):
    """
    Check if the response status code is the expected
    """
    assert context['response'].status_code == int(status_code)

@then(parsers.parse('o JSON da resposta deve conter o usuário atualizado com id "{id}", name "{name}", email "{email}"'))
def check_response_json_contains_updated_user(context, id: str, name: str, email: str):
    """
    Check if the response JSON contains the updated user data
    """
    response_json = context['response'].json()
    
    # Verifique se a chave 'data' está presente na resposta JSON
    assert 'data' in response_json, "A resposta JSON não contém a chave 'data'"
    
    response_data = response_json['data']
    
    # Dados esperados
    expected_data = {
        "id": id,
        "name": name,
        "email": email
    }
    
    # Verifique se os dados esperados estão presentes na resposta
    assert expected_data == response_data, f"Esperava {expected_data}, mas obteve {response_data}"