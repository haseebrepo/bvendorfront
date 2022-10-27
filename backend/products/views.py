from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Product
from .serializers import ProductSerializer, ProductViewSerializer


status_200_ok = status.HTTP_200_OK
status_created_201 = status.HTTP_201_CREATED
status_bad_req_400 = status.HTTP_400_BAD_REQUEST
status_un_auth_401 = status.HTTP_401_UNAUTHORIZED


class ProductView(APIView):
    permission_classes = [IsAuthenticated,]
    parser_classes = (MultiPartParser, FormParser)
    def get(self, request, *args, **kwargs):
        try:
            many = False
            products = {}
            print('here is the user id',request.user.id)
            if request.GET.get('product'):
                if request.GET.get('product') == 'all':
                    many = True
                    products = Product.objects.filter(user=request.user.id)
                else:
                    products = Product.objects.filter(id=request.GET.get('product')).first()

                serializer = ProductViewSerializer(products,many=many)
                status_code = status_200_ok
                response = {'data': serializer.data, 'success': True, 'message':'product fetched successfully', 'status_code': status_code}
                # print('here: ', serializer.data)
                return Response(response, status_code)
            status_code = status_bad_req_400
            return Response({'data':[], 'success': False, 'message': 'Product id not provided', 'status_code': status_code},status_code )
        except Exception as e:
            return Response({'data':[], 'success':False, 'message':str(e)}, status_bad_req_400)

    def post(self, request, *args, **kwargs):
        data = request.data
        if not data:
            return Response({'data':[], 'success':False, 'message':'Please Enter Data To Upload Product'}, status_bad_req_400)
        
        try:
            data['user'] = request.user.id
            # if data.get('price') is not None:
            #     data['price'] = int(data.get('price'))
            
            serializer = ProductSerializer(data=data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                response_data = serializer.data
                status_code = status_created_201
                response = {'data': response_data, 'success': True, 'message':'product uploaded successfully', 'status_code': status_code}
                return Response(response, status_code)
        except Exception as e:
            return Response({'data':[], 'success':False, 'message':str(e)}, status_bad_req_400)

    def put(self, request, *args, **kwargs):
        pass

    def delete(self, request, *args, **kwargs):
        try:
            Product.objects.filter(id=request.GET.get('id')).delete()
            return Response({'data':[], 'success':True, 'message': 'deleted successfully'})
        except Exception as e:
            return Response({'data':[], 'success':False, 'message': str(e)})
