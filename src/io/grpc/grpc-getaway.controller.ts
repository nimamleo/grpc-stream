import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { IUser, IUserEntity } from '../../model/user.model';
import { UserService } from '../../application/user.service';
import { Observable, Subject } from 'rxjs';

@Controller()
export class GrpcGetawayController {
  constructor(private readonly userService: UserService) {}
  private readonly logger = new Logger(GrpcGetawayController.name);

  @GrpcMethod('UserService', 'createUser')
  async createUser(data: IUser): Promise<IUserEntity> {
    this.logger.debug('create user called');

    const res = await this.userService.createUser(data);
    return res;
  }
  @GrpcMethod('UserService', 'FindUserById')
  async getUser(token: { id: string }): Promise<IUserEntity> {
    this.logger.debug('get user called');
    const res = await this.userService.getUser(token.id);
    return res;
  }

  @GrpcStreamMethod('UserService', 'testStream')
  streamTest(messages: Observable<any>): Observable<any> {
    const subject = new Subject();
    let num: number = 0;

    const onNext = () => {
      setInterval(() => {
        num++;
        subject.next({
          reply: num,
        });
      }, 1000);
    };

    const onComplete = () => {
      subject.next({
        reply: 'finish!',
      });
      subject.complete();
    };

    messages.subscribe({
      next: onNext,
      complete: onComplete,
    });

    return subject.asObservable();
  }
}
