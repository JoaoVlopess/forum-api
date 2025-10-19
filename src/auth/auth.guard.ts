import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly jwtService: JwtService,
  ) { }


  async canActivate(
    context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest(); // no contexto fazemos um switch para trabalharmos com req http e retornar a request
    const authorization = this.extractTokenFromHeader(request); // pegar o token do cabeçalho Authorization da requisição.
    if (!authorization) throw new UnauthorizedException('Token is required'); //Se o token não estiver presente, lança um erro 401
    try {
      const payload = await this.jwtService.verifyAsync(authorization,
        {
          secret: process.env.SECRET_KEY
        }
      );
      //  Estamos atribuindo a carga útil ao objeto de solicitação aqui
      // para que possamos acessá-la em nossos manipuladores de rota
      request['user'] = payload; //Isso permite que o controller acesse os dados do usuário autenticado:
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
    return true;
  }



  private extractTokenFromHeader(request: Request): string | undefined { //fará um array com as informações do header separados ex [Bearer, tokendghasuiydasdbasiu]. se for enviado retorna o token
    const [type, token] =
      request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
