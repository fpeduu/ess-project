from src.schemas.response import HTTPResponses, HttpResponseModel
from pytest_bdd import parsers, given, when, then, scenario
from src.service.impl.equipment_service import EquipmentService
from src.schemas.equipment import EquipmentGet, EquipmentModel

@scenario(scenario_name='Listar todos os equipamentos', feature_name='../features/equipment.feature')
def test_list_all_equipments():
    """ List all equipments """

@scenario(scenario_name='Criar um novo equipamento', feature_name='../features/equipment.feature')
def test_create_equipment():
    """ Create a new equipment """

@scenario(scenario_name='Deletar um equipamento existente', feature_name='../features/equipment.feature')
def test_delete_equipment():
    """ Delete an existing equipment """

@given(parsers.cfparse('o EquipmentService retorna uma lista de equipamentos'))
def mock_equipment_service_response():
    """
    Mock the EquipmentService.list_equipments() method to return a list of equipments
    """
    EquipmentService.list_equipments = lambda: [
        EquipmentGet(id="1", name="equipamento1", description="descrição1", amount=10, created_at="2024-01-01T00:00:00Z")
    ]

@when(parsers.cfparse('uma requisição GET for enviada para "{req_url}"'), target_fixture='context')
def send_get_all_equipments_request(client, context, req_url: str):
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

@then(parsers.cfparse('o JSON da resposta deve conter o equipamento com id "{id}", name "{name}", description "{description}", amount "{amount}", created_at "{created_at}"'), target_fixture='context')
def check_response_json_contains_equipment_data(context, id: str, name: str, description: str, amount: str, created_at: str):
    """
    Check if the response JSON contains the equipment data
    """
    expected_data = {"id": id, "name": name, "description": description, "amount": int(amount), "created_at": created_at}
    assert expected_data in context['response'].json()
    return context

@given(parsers.cfparse('o EquipmentService permite a criação de um equipamento'))
def mock_equipment_service_create_method():
    """
    Mock the EquipmentService.create_equipment() method
    """
    EquipmentService.create_equipment = lambda equipment_data: EquipmentGet(**equipment_data)

@when(parsers.cfparse('uma requisição POST for enviada para "{req_url}" com os dados do equipamento: id "{id}", name "{name}", description "{description}", amount "{amount}", created_at "{created_at}"'), target_fixture='context')
def send_create_equipment_request(client, context, req_url: str, id: str, name: str, description: str, amount: str, created_at: str):
    """
    Send a POST request to the given URL with the equipment data
    """
    equipment_data = {"id": id, "name": name, "description": description, "amount": int(amount), "created_at": created_at}
    response = client.post(req_url, json=equipment_data)
    context['response'] = response
    return context

@given(parsers.cfparse('o EquipmentService permite a exclusão de um equipamento'))
def mock_equipment_service_delete_method():
    """
    Mock the EquipmentService.delete_equipment() method
    """
    EquipmentService.delete_equipment = lambda equipment_id: None

@when(parsers.cfparse('uma requisição DELETE for enviada para "{req_url}"'), target_fixture='context')
def send_delete_equipment_request(client, context, req_url: str):
    """
    Send a DELETE request to the given URL
    """
    response = client.delete(req_url)
    context['response'] = response
    return context

@then(parsers.cfparse('a mensagem da resposta deve ser "{message}"'), target_fixture='context')
def check_response_message(context, message: str):
    """
    Check if the response message is the expected
    """
    assert context['response'].json()['message'] == message
    return context
